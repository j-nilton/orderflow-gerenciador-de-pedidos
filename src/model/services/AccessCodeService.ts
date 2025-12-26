export interface AccessCodeService {
  issueNewCode(): Promise<string>;
  validateForUse(code: string): Promise<boolean>;
  markUsed(code: string): Promise<void>;
  isIssued(code: string): Promise<boolean>;
  generateOwnerCode(): Promise<string>;
  getOwnerState(): Promise<{ activeCode: string | null; confirmed: boolean; pendingCode: string | null; canGenerate: boolean }>;
  confirmOwnerCode(): Promise<void>;
  resetOwnerCode(): Promise<void>;
  validateCollaboratorCode(code: string): Promise<boolean>;
}
