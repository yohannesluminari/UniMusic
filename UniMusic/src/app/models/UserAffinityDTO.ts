// user-affinity.dto.ts
export interface UserAffinityDTO {
  userId1: number;
  userId2: number;
  affinityScore: number;
  rank?: number; // Optional, if needed
}
