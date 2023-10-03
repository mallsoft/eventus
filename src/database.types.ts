export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
	public: {
		Tables: {
			event_admin: {
				Row: {
					created_at: string;
					id: number;
					user_id: string;
				};
				Insert: {
					created_at?: string;
					id?: number;
					user_id: string;
				};
				Update: {
					created_at?: string;
					id?: number;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'event_admin_user_id_fkey';
						columns: ['user_id'];
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
			events: {
				Row: {
					created_at: string;
					description: string;
					end_time: string;
					id: number;
					max_pax: number;
					name: string;
					pax: number;
					publish_on: string;
					rsvp_before: string;
					start_time: string;
				};
				Insert: {
					created_at?: string;
					description: string;
					end_time: string;
					id?: number;
					max_pax: number;
					name: string;
					pax?: number;
					publish_on?: string;
					rsvp_before: string;
					start_time: string;
				};
				Update: {
					created_at?: string;
					description?: string;
					end_time?: string;
					id?: number;
					max_pax?: number;
					name?: string;
					pax?: number;
					publish_on?: string;
					rsvp_before?: string;
					start_time?: string;
				};
				Relationships: [];
			};
			rsvps: {
				Row: {
					created_at: string;
					event_id: number;
					user_id: string;
				};
				Insert: {
					created_at?: string;
					event_id: number;
					user_id?: string;
				};
				Update: {
					created_at?: string;
					event_id?: number;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'rsvps_event_id_fkey';
						columns: ['event_id'];
						referencedRelation: 'events';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'rsvps_user_id_fkey';
						columns: ['user_id'];
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			register_to_event: {
				Args: {
					event_id: number;
				};
				Returns: undefined;
			};
			unregister_from_event: {
				Args: {
					event_id: number;
				};
				Returns: undefined;
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
