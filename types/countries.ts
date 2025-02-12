export interface CountryType {
	name: string;
	full_name: string;
	capital: string;
	iso: string;
	iso3: string;
	current_president: {
		name: string;
		appointment_start_date: string;
		appointment_end_date: string;
		href: {
			self: string;
			picture: string;
		};
	};
	currency: string;
	phone_code: string;
	continent: string;
	size: string;
	population: string;
	self: string;
	states: string;
	presidents: string;
	flag: string;
}
