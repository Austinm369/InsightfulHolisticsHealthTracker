import { BaseButton } from './BaseButton.js';
import { WeeklyCalendar } from '../calendar/WeeklyCalendar.js';
import { MENU_ICONS, MENU_LABELS } from './constants.js';

export class CalendarButton extends BaseButton {
  constructor() {
    const calendar = new WeeklyCalendar();
    super(
      MENU_LABELS.CALENDAR,
      MENU_ICONS.CALENDAR,
      () => calendar.show()
    );
  }
}