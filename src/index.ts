class Calendar {

    // position values
    private year: number;
    private month: number;

    // grid
    private grid: Array<Array<string>> = [];

    /**
     * creates new calendar object
     * @param {number} year     - year value
     * @param {number} month    - month value
     */
    constructor(year: number, month: number) {
        this.year = year;
        this.month = month;

        this.grid = [...this.genGrid()];
    }

    /**
     * checks if the current year of the calendar object is a leap year
     * @returns {boolean}   - is leap year
     */
    isLeapYear = (): boolean => Calendar.isLeapYear(this.year);

    /**
     * generates the grid object
     */
    genGrid = (): Array<Array<string>> => {
        let startDay: number = new Date(`${this.year}-${this.appendZero(this.month)}-01`).getDay();
        let dayCount: number = Calendar.getDateNum(this.year, this.month);
        let cellCount: number = Math.ceil((startDay + dayCount) / 7) * 7;

        let prevMonth: { year: number, month: number } = Calendar.getPrevMonth(this.year, this.month);
        let nextMonth: { year: number, month: number } = Calendar.getNextMonth(this.year, this.month);
        let gridStart: number = Calendar.getDateNum(this.year, prevMonth.month) - startDay + 1;

        let grid: Array<Array<string>> = [];

        for (let i = 0; i < cellCount; ++i) {
            let row: number = Math.floor(i / 7);
            let col: number = i % 7;

            let obj: { date: number, month: number, year: number };
            if (row == 0 && i < startDay)
                obj = { date: gridStart++, month: prevMonth.month, year: prevMonth.year };
            else if (i < startDay + dayCount)
                obj = { date: i - startDay + 1, month: this.month, year: this.year };
            else
                obj = { date: i - (startDay + dayCount) + 1, month: nextMonth.month, year: nextMonth.year };

            if (grid[row] === undefined)
                grid[row] = [];

            grid[row][col] = `${this.appendZero(obj.date)}-${this.appendZero(obj.month)}-${obj.year}`;
        }

        return grid;
    }

    /**
     * retrieves the 2 by 2 array representation of the calendar object
     * @returns {Array<Array<string>>}  - calendar array
     */
    getGrid = (): Array<Array<string>> => this.grid;

    /**
     * retrieve the next month's value of the calendar object
     * @returns {{ year: number, month: number }}   - calendar position pair
     */
    getNextMonth = (): { year: number, month: number } => Calendar.getNextMonth(this.year, this.month);

    /**    
     * retrieve the previous month's value of the calendar object
     * @returns {{ year: number, month: number }}   - calendar position pair
     */
    getPrevMonth = (): { year: number, month: number } => Calendar.getPrevMonth(this.year, this.month);

    /**
     * increments the calendar month by 1
     * year is incremented if current month is 12
     */
    nextMonth = (): void => {
        let monthConfig: { year: number, month: number } = this.getNextMonth();

        this.year = monthConfig.year;
        this.month = monthConfig.month;

        this.grid = [...this.genGrid()];
    }

    /**
     * decrements the calendar month by 1 
     * year is decremented if the current month is 1
     */
    prevMonth = (): void => {
        let monthConfig: { year: number, month: number } = this.getPrevMonth();

        this.year = monthConfig.year;
        this.month = monthConfig.month;

        this.grid = [...this.genGrid()];
    }

    /**
     * set the calendar object to be at a specific position
     * @param {number} year     - year value
     * @param {number} month    - month value
     */
    setMonth = (year: number, month: number): void => {
        this.year = year;
        this.month = month;

        this.grid = [...this.genGrid()];
    }

    // static methods

    /**
     * check if given month is an odd month (months with 31 days)
     * @param {number} month    - month value
     * @returns {boolean}       - is odd month
     */
    static isOddMonth = (month: number): boolean =>
        ((month > 7) && (month % 2 === 0)) || ((month < 8) && (month % 2 === 1));

    /**
     * check if given year is a leap year
     * @param {number} year - year value
     * @returns {boolean}   - is leap year
     */
    static isLeapYear = (year: number): boolean => ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);

    /**
     * retrieve the numbers of days in a specific month
     * @param {number} year     - year value 
     * @param {number} month    - month value
     * @returns {number}        - number of days
     */
    static getDateNum = (year: number, month: number): number => {
        let base = month === 2 ? 28 : 30;

        if (Calendar.isOddMonth(month) || month === 2 && Calendar.isLeapYear(year))
            base += 1;

        return base;
    }

    /**
     * retrieve the next calendar position given a specific calendar position
     * @param {number} year                         - year value 
     * @param {number} month                        - month value 
     * @returns {{ year: number, month: number }}   - calendar position pair
     */
    static getNextMonth = (year: number, month: number): { year: number, month: number } => ({
        month: month % 12 + 1,
        year: year + Math.floor(month / 12),
    });

    /**
     * retrieve the previous calendar position given a specific calendar position
     * @param {number} year                         - year value 
     * @param {number} month                        - month value 
     * @returns {{ year: number, month: number }}   - calendar position pair
     */
    static getPrevMonth = (year: number, month: number): { year: number, month: number } => ({
        month: Math.floor(1 / month) * 12 + month - 1,
        year: year - Math.floor(1 / month),
    });


    // private methods

    private appendZero = (value: number) => ('0' + value.toString()).slice(-2);
}

export = Calendar;
