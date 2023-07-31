import Bedroom from '../../../assets/svgs/Bedroom.svg'
import Bathroom from '../../../assets/svgs/Bathroom.svg'
import Sleep from '../../../assets/svgs/Sleep.svg'
import Park from '../../../assets/svgs/Park.svg'
import Pool from '../../../assets/svgs/Pool.svg'
import Wifi from '../../../assets/svgs/Wifi.svg'
import Air from '../../../assets/svgs/Air.svg'
import Balcony from '../../../assets/svgs/Balcony.svg'
import Garden from '../../../assets/svgs/Garden.svg'
import Smoking from '../../../assets/svgs/Smoking.svg'
import Pets from '../../../assets/svgs/Pets.svg'
import Washing from '../../../assets/svgs/Washing.svg'
import Work from '../../../assets/svgs/Work.svg'
import Parking from '../../../assets/svgs/Parking.svg'
// noOfBathroom
// :
// 2
// noOfBedroom
// :
// 3
// noOfPeople
// :
// 6
// noOfSleep
// :
// 6
// noOfStudio
// :
// 0

export const BedroomSizeEnums = {
	noOfStudio: {
		label: 'Studio',
		value: 'noOfStudio',
		icon: Bedroom,
	},
	noOfBedroom: {
		label: 'Bedroom',
		value: 'noOfBedroom',
		icon: Bedroom,
	},
	noOfBathroom: {
		label: 'Bathroom',
		value: 'noOfBathroom',
		icon: Bathroom,
	},
	noOfSleep: {
		label: 'Sleep',
		value: 'noOfSleep',
		icon: Sleep,
	},
}

export const AmenitiesEnums = {
	entirePlace: {
		label: 'Entire Place',
		value: 'entirePlace',
		icon: Park,
	},
	petFriendly: {
		label: 'Pet Friendly',
		value: 'petFriendly',
		icon: Pets,
	},
	pool: {
		label: 'Pool',
		value: 'pool',
		icon: Pool,
	},
	parking: {
		label: 'Parking',
		value: 'parking',
		icon: Parking,
	},
	washingMachine: {
		label: 'Washing Machine',
		value: 'washingMachine',
		icon: Washing,
	},
	airConditioner: {
		label: 'Air Conditioning',
		value: 'airConditioner',
		icon: Air,
	},
	workDesk: {
		label: 'Work Desk',
		value: 'workDesk',
		icon: Work,
	},
	wifi: {
		label: 'Wifi',
		value: 'wifi',
		icon: Wifi,
	},
	noSmoking: {
		label: 'No Smoking',
		value: 'noSmoking',
		icon: Smoking,
	},
	balcony: {
		label: 'Balcony',
		value: 'balcony',
		icon: Balcony,
	},
	garden: {
		label: 'Garden',
		value: 'garden',
		icon: Garden,
	},
}

export const CalendarEnums = {
	january: {
		label: 'January',
		value: 'january',
		totalDays: 31,
	},
	february: {
		label: 'February',
		value: 'february',
		totalDays: 28,
	},
	march: {
		label: 'March',
		value: 'march',
		totalDays: 31,
	},
	april: {
		label: 'April',
		value: 'april',
		totalDays: 30,
	},
	may: {
		label: 'May',
		value: 'may',
		totalDays: 31,
	},
	june: {
		label: 'June',
		value: 'june',
		totalDays: 30,
	},
	july: {
		label: 'July',
		value: 'july',
		totalDays: 31,
	},
	august: {
		label: 'August',
		value: 'august',
		totalDays: 31,
	},
	september: {
		label: 'September',
		value: 'september',
		totalDays: 30,
	},
	october: {
		label: 'October',
		value: 'october',
		totalDays: 31,
	},
	november: {
		label: 'November',
		value: 'november',
		totalDays: 30,
	},
	december: {
		label: 'December',
		value: 'december',
		totalDays: 31,
	},
}

export const WeekDaysEnums = {
	sunday: {
		label: 'Sunday',
		short: 'Su',
		value: 'sunday',
	},
	monday: {
		label: 'Monday',
		short: 'Mo',
		value: 'monday',
	},
	tuesday: {
		label: 'Tuesday',
		short: 'Tu',
		value: 'tuesday',
	},
	wednesday: {
		label: 'Wednesday',
		short: 'We',
		value: 'wednesday',
	},
	thursday: {
		label: 'Thursday',
		short: 'Th',
		value: 'thursday',
	},
	friday: {
		label: 'Friday',
		short: 'Fr',
		value: 'friday',
	},
	saturday: {
		label: 'Saturday',
		short: 'Sat',
		value: 'saturday',
	},
}
