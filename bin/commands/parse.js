"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var split_1 = __importDefault(require("split"));
var command_1 = require("../command");
var ParseCommand = /** @class */ (function () {
    function ParseCommand() {
    }
    Object.defineProperty(ParseCommand.prototype, "description", {
        get: function () {
            return "Parses hcidump output";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParseCommand.prototype, "options", {
        get: function () {
            var result = {
                someDummyParameter: {
                    nargs: 1,
                    type: 'string',
                    default: 'A default value',
                    description: 'Some parameter description'
                },
                anotherDummyParameter: {
                    nargs: 1,
                    type: 'string',
                    default: 'Another default value',
                    description: 'Another parameter description'
                }
            };
            return result;
        },
        enumerable: true,
        configurable: true
    });
    ParseCommand.prototype.run = function (name, opts) {
        return __awaiter(this, void 0, void 0, function () {
            var record, buffer;
            return __generator(this, function (_a) {
                record = null;
                buffer = [];
                process.stdin.pipe(split_1.default()).on('data', function (line) {
                    if (line.startsWith('> HCI Event: ')) {
                        if (record) {
                            buffer.push(record);
                            process.stdout.write(JSON.stringify(record));
                            process.stdout.write('\n');
                        }
                        record = {};
                        record.time = line.substr(line.length - 26);
                    }
                    else if (line.startsWith('        Address: ')) {
                        record.address = line.substr(17, 17);
                        record.resolution = line.substr(36, line.length - 37);
                    }
                    else if (line.startsWith('        RSSI:')) {
                        record.rssi = +line.substring(14, line.indexOf(' dBm', 14));
                    }
                    else if (line.startsWith('        Company: ')) {
                        record.company = line.substring(17, line.lastIndexOf(' ') - 1);
                    }
                    else if (line.startsWith('          Data: ')) {
                        record.data = line.substring(16);
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    ParseCommand = __decorate([
        command_1.Command
    ], ParseCommand);
    return ParseCommand;
}());
exports.ParseCommand = ParseCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvcGFyc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdEQUEwQjtBQU8xQixzQ0FBK0U7QUFpQi9FO0lBQUE7SUFtREEsQ0FBQztJQWxERyxzQkFBVyxxQ0FBVzthQUF0QjtZQUNJLE9BQU8sdUJBQXVCLENBQUM7UUFDbkMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxpQ0FBTzthQUFsQjtZQUNJLElBQU0sTUFBTSxHQUF3RDtnQkFDaEUsa0JBQWtCLEVBQUU7b0JBQ2hCLEtBQUssRUFBRSxDQUFDO29CQUNSLElBQUksRUFBRSxRQUFRO29CQUNkLE9BQU8sRUFBRSxpQkFBaUI7b0JBQzFCLFdBQVcsRUFBRSw0QkFBNEI7aUJBQzVDO2dCQUVELHFCQUFxQixFQUFFO29CQUNuQixLQUFLLEVBQUUsQ0FBQztvQkFDUixJQUFJLEVBQUUsUUFBUTtvQkFDZCxPQUFPLEVBQUUsdUJBQXVCO29CQUNoQyxXQUFXLEVBQUUsK0JBQStCO2lCQUMvQzthQUNKLENBQUM7WUFFRixPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDOzs7T0FBQTtJQUVZLDBCQUFHLEdBQWhCLFVBQWlCLElBQVksRUFBRSxJQUE2Qjs7OztnQkFDcEQsTUFBTSxHQUFXLElBQXFCLENBQUM7Z0JBQ3ZDLE1BQU0sR0FBYSxFQUFFLENBQUM7Z0JBRTFCLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGVBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFDLElBQUk7b0JBQ3hDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsRUFBRTt3QkFDbEMsSUFBSSxNQUFNLEVBQUU7NEJBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs0QkFDcEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOzRCQUM3QyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzt5QkFDOUI7d0JBRUQsTUFBTSxHQUFHLEVBQVMsQ0FBQzt3QkFDbkIsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLENBQUM7cUJBQy9DO3lCQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO3dCQUM3QyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO3dCQUNyQyxNQUFNLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLENBQUM7cUJBQ3pEO3lCQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsRUFBRTt3QkFDekMsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7cUJBQy9EO3lCQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO3dCQUM3QyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7cUJBQ2xFO3lCQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO3dCQUM1QyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7cUJBQ3BDO2dCQUNMLENBQUMsQ0FBQyxDQUFDOzs7O0tBQ047SUFsRFEsWUFBWTtRQUR4QixpQkFBTztPQUNLLFlBQVksQ0FtRHhCO0lBQUQsbUJBQUM7Q0FBQSxBQW5ERCxJQW1EQztBQW5EWSxvQ0FBWSJ9