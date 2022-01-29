import axios from 'axios';
import moment from 'moment';

// util for parsing html into event objects

// standardize for all formats of this type
// update with correct year and AM/PM
// if nov or dec, 2021. else 2022
export const getFootballEvents = async () => {
    const {data} = await axios.get('https://cyclones.com/services/schedule_txt.ashx?schedule=1184');
    // const {data} = await axios.get('https://www.kstatesports.com/services/schedule_txt.ashx?schedule=2540');

    let events = [];

    const gameStrings = data.split("\n").slice(10);
    const date = gameStrings[0].indexOf('Date');
    const time = gameStrings[0].indexOf('Time');
    const at = gameStrings[0].indexOf('At');
    const opponent = gameStrings[0].indexOf('Opponent');

// parse until 2 spaces
    for (let i = 1; i < gameStrings.length; i++) {
        // substring: date -> indexOf('  ')
        // these get first space, not next space
        const curDate = gameStrings[i].substring(date);
        const curTime = gameStrings[i].substring(time);
        const curAt = gameStrings[i].substring(at);
        const curOpponent = gameStrings[i].substring(opponent);

        const dateOnly = curDate.substring(0, curDate.indexOf(' ('));
        const timeOnly = curTime.substring(0, curTime.indexOf(' '));
        const atOnly = curAt.substring(0, curAt.indexOf('  '));
        const oppOnly = curOpponent.substring(0, curOpponent.indexOf('  '));

        let h = 0,m = 0,s = 0;
        if (timeOnly !== 'TBA' && timeOnly !== 'TBD') {
            const split = timeOnly.split(':');
            h = parseInt(split[0]);
            if (h !== 11) {
                h += 12;
            }
            m = parseInt(split[1]);
        }

        // let year = 2022;
        // if (dateOnly.substring(0,3) === 'Nov' || dateOnly.substring(0,3) === 'Dec') {
        //     year = 2021;
        // }

        const dateBuilder = moment()
            .year(2021)
            .month(dateOnly.substring(0,3))
            .date(parseInt(dateOnly.substring(4,6)))
            .hour(h)
            .minute(m)
            .second(s)
            .format('YYYY-MM-DD HH:mm:ss');

        events.push({
            sport: 'Football',
            opponent: oppOnly,
            home: atOnly === 'Home',
            date: dateBuilder
        });
    }
    return events;
}

