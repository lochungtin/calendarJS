class Calendar {

    private year: number;
    private month: number;

    private grid: Array<Array<string>> = [];

    constructor(year: number, month: number) {
        this.year = year;
        this.month = month;

        this.genGrid();
    }

    isLeapYear = (): boolean => Calendar.isLeapYear(this.year);

    getGrid = (): Array<Array<string>> => this.grid;

    getNextMonth = (): { year: number, month: number } => Calendar.getNextMonth(this.year, this.month);

    getPrevMonth = (): { year: number, month: number } => Calendar.getPrevMonth(this.year, this.month);

    nextMonth = (): void => {
        let monthConfig: { year: number, month: number } = this.getNextMonth();

        this.year = monthConfig.year;
        this.month = monthConfig.month;

        this.genGrid();
    }

    prevMonth = (): void => {
        let monthConfig: { year: number, month: number } = this.getPrevMonth();

        this.year = monthConfig.year;
        this.month = monthConfig.month;

        this.genGrid();
    }

    setMonth = (year: number, month: number): void => {
        this.year = year;
        this.month = month;

        this.genGrid();
    }

    // static methods

    static isLeapYear = (year: number): boolean => ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);

    static getDateNum = (year: number, month: number): number => {
        let base = 28;

        if (month !== 2)
            base += 2;

        if (Calendar.isOddMonth(month) || month === 2 && Calendar.isLeapYear(year))
            base += 1;

        return base;
    }

    static getNextMonth = (year: number, month: number): { year: number, month: number } => ({
        month: month % 12 + 1,
        year: year + Math.floor(month / 12),
    });

    static getPrevMonth = (year: number, month: number): { year: number, month: number } => ({
        month: Math.floor(1 / month) * 12 + month - 1,
        year: year - Math.floor(1 / month),
    });


    // private methods

    private appendZero = (value: number) => ('0' + value.toString()).slice(-2);

    private genGrid = (): void => {
        let startDay: number = new Date(`${this.year}-${this.month}-01`).getDay();
        let dayCount: number = Calendar.getDateNum(this.year, this.month);
        let cellCount: number = Math.ceil((startDay + dayCount) / 7) * 7;

        let prevMonth: { year: number, month: number } = Calendar.getPrevMonth(this.year, this.month);
        let nextMonth: { year: number, month: number } = Calendar.getNextMonth(this.year, this.month);
        let gridStart: number = Calendar.getDateNum(this.year, prevMonth.month) - startDay + 1;

        this.grid = [];

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

            if (this.grid[row] === undefined)
                this.grid[row] = [];

            // this.grid[row][col] = `${this.appendZero(obj.date)}-${this.appendZero(obj.month)}-${obj.year}`;
            this.grid[row][col] = this.appendZero(obj.date);
        }
    }

    private static isOddMonth = (month: number): boolean =>
        ((month > 7) && (month % 2 === 0)) || ((month < 8) && (month % 2 === 1));
}

export = Calendar;
