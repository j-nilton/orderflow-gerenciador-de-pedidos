import { AccessCodeService } from '../../model/services/AccessCodeService';
/**
 * In-memory access code registry for demo purposes.
 */
export class MockAccessCodeService implements AccessCodeService {
  private issuedCodes = new Set<string>();
  private usedCodes = new Set<string>();
  private static activeOwnerCode: string | null = null;
  private static ownerCodeConfirmed: boolean = false;
  private static pendingOwnerCode: string | null = null;
  private static canGenerateAfterReset: boolean = false;

  async issueNewCode(): Promise<string> {
    // Generate a 9-digit code with unique digits, not previously issued
    let code: string = '';
    do {
      code = this.generateUniqueDigitsCode();
    } while (this.issuedCodes.has(code));
    this.issuedCodes.add(code);
    return code;
  }

  async validateForUse(code: string): Promise<boolean> {
    if (!code || code.length !== 9) return false;
    if (!this.issuedCodes.has(code)) return false;
    if (this.usedCodes.has(code)) return false;
    // Ensure digits are unique
    const set = new Set(code.split(''));
    return set.size === 9;
  }

  async markUsed(code: string): Promise<void> {
    if (!this.issuedCodes.has(code)) {
      // If someone tries to use a non-issued code, we ignore/deny by not marking it used
      return;
    }
    this.usedCodes.add(code);
  }

  async isIssued(code: string): Promise<boolean> {
    return this.issuedCodes.has(code);
  }

  async generateOwnerCode(): Promise<string> {
    // Only allow if no confirmed active code OR reset unlocked generation
    if (MockAccessCodeService.ownerCodeConfirmed && !MockAccessCodeService.canGenerateAfterReset) {
      throw new Error('Geração bloqueada. Redefina para liberar.');
    }
    const code = this.generateUniqueDigitsCode();
    MockAccessCodeService.pendingOwnerCode = code;
    MockAccessCodeService.canGenerateAfterReset = false;
    return code;
  }

  async getOwnerState(): Promise<{ activeCode: string | null; confirmed: boolean; pendingCode: string | null; canGenerate: boolean }> {
    const canGenerate = !MockAccessCodeService.ownerCodeConfirmed || MockAccessCodeService.canGenerateAfterReset;
    return {
      activeCode: MockAccessCodeService.activeOwnerCode,
      confirmed: MockAccessCodeService.ownerCodeConfirmed,
      pendingCode: MockAccessCodeService.pendingOwnerCode,
      canGenerate,
    };
  }

  async confirmOwnerCode(): Promise<void> {
    if (MockAccessCodeService.pendingOwnerCode) {
      MockAccessCodeService.activeOwnerCode = MockAccessCodeService.pendingOwnerCode;
      MockAccessCodeService.ownerCodeConfirmed = true;
      MockAccessCodeService.pendingOwnerCode = null;
      MockAccessCodeService.canGenerateAfterReset = false;
    }
  }

  async resetOwnerCode(): Promise<void> {
    // Do NOT generate a new code here; only unlock generation
    MockAccessCodeService.canGenerateAfterReset = true;
    // Keep current active code valid until a new one is confirmed
  }

  async validateCollaboratorCode(code: string): Promise<boolean> {
    if (!code || code.length !== 9) return false;
    const set = new Set(code.split(''));
    if (set.size !== 9) return false;
    return MockAccessCodeService.ownerCodeConfirmed && MockAccessCodeService.activeOwnerCode === code;
  }

  private generateUniqueDigitsCode(): string {
    const digits = ['0','1','2','3','4','5','6','7','8','9'];
    // Remove one random digit to ensure we have 9 unique digits
    const removedIndex = Math.floor(Math.random() * digits.length);
    digits.splice(removedIndex, 1);
    // Shuffle remaining digits
    for (let i = digits.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [digits[i], digits[j]] = [digits[j], digits[i]];
    }
    return digits.join('');
  }
}
