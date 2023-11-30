import {ROUTES_NAMES} from "../constants/routes-names.constant";
import {APP_TEXT, ERROR_MESSAGES} from "../constants/text.constant";
import {APP_CONST} from "../constants/common.constant";

export class ConstantHelper {
    public readonly routesNames = ROUTES_NAMES;
    public readonly text = APP_TEXT;
    public readonly constants = APP_CONST;
    public readonly errorMessages = ERROR_MESSAGES;
}
