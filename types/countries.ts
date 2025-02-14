export interface CountryType {
	name: {
		common: string;
		official: string;
	};
	full_name: string;
	capital: string;
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
	region: string;
	flags: {
		svg: string;
		png: string;
	};
	coatOfArms: {
		svg: string;
		png: string;
	};
	continents: string[];
	idd: {
		root: string;
	};
}
