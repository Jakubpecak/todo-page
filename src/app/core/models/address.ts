export interface Address {
    street?: string | null;
    suite?: string | null;
    city?: string | null;
    country?: string | null;
    geo?: {
        lat?: string | null; 
        lng?: string | null;
    }
}
