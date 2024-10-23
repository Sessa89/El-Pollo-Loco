class IntervalManager {
    constructor() {
        this.intervals = {};
    }


    /**
     * This function sets a new interval and saves its ID with a name.
     * @param {string} name - The name of the interval.
     * @param {Function} fn - The function which will be executed.
     * @param {number} time - The period of time of the interval in milliseconds.
     */
    setInterval(name, fn, time) {
        const intervalId = setInterval(fn, time);
        this.intervals[name] = intervalId;
    }


    /**
     * The function clears one interval by name.
     * @param {string} name - The name of the interval which will be deleted.
     */
    clearIntervalByName(name) {
        clearInterval(this.intervals[name]);
        delete this.intervals[name];
    }

    
    /**
     * This function clears all intervals.
     */
    clearAllIntervals() {
        Object.keys(this.intervals).forEach(name => clearInterval(this.intervals[name]));
        this.intervals = {};
    }
}

const intervalManager = new IntervalManager();