import { AccessCodeService } from '../model/services/AccessCodeService';

export class AccessCodeUseCase {
  constructor(private accessCodeService: AccessCodeService) {}

  async issueCode(): Promise<{ code: string; formatted: string }> {
    const code = await this.accessCodeService.issueNewCode();
    return { code, formatted: this.format(code) };
  }

  async validateAndUse(code: string): Promise<boolean> {
    const valid = await this.accessCodeService.validateCollaboratorCode(code);
    return valid;
  }

  format(code: string): string {
    if (!code) return '';
    // 123 • 456 • 789
    const a = code.slice(0,3);
    const b = code.slice(3,6);
    const c = code.slice(6,9);
    return [a,b,c].join(' • ');
  }

  async getOwnerState(): Promise<{ activeCode: string | null; formattedActive: string | null; pendingCode: string | null; formattedPending: string | null; confirmed: boolean; canGenerate: boolean }> {
    const { activeCode, confirmed, pendingCode, canGenerate } = await this.accessCodeService.getOwnerState();
    return {
      activeCode,
      confirmed,
      pendingCode,
      canGenerate,
      formattedActive: activeCode ? this.format(activeCode) : null,
      formattedPending: pendingCode ? this.format(pendingCode) : null,
    };
  }

  async generateOwnerCode(): Promise<{ code: string; formatted: string }> {
    const code = await this.accessCodeService.generateOwnerCode();
    return { code, formatted: this.format(code) };
  }

  async confirmOwnerCode(): Promise<void> {
    await this.accessCodeService.confirmOwnerCode();
  }

  async resetOwnerCode(): Promise<void> {
    await this.accessCodeService.resetOwnerCode();
  }
}
