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
Object.defineProperty(exports, "__esModule", { value: true });
var command_1 = require("../command");
var ExampleCommandNameCommand = /** @class */ (function () {
    function ExampleCommandNameCommand() {
    }
    Object.defineProperty(ExampleCommandNameCommand.prototype, "description", {
        get: function () {
            return "[An example command description]";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExampleCommandNameCommand.prototype, "options", {
        get: function () {
            if (!process.env.HOME) {
                throw new Error("Unable to resolve $HOME folder path");
            }
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
    ExampleCommandNameCommand.prototype.run = function (name, opts) {
        return __awaiter(this, void 0, void 0, function () {
            var options;
            return __generator(this, function (_a) {
                options = opts;
                console.log("Command " + name + " successfully executed");
                console.log("Params:");
                console.log(JSON.stringify(options, null, 2));
                return [2 /*return*/];
            });
        });
    };
    ExampleCommandNameCommand = __decorate([
        command_1.Command
    ], ExampleCommandNameCommand);
    return ExampleCommandNameCommand;
}());
exports.ExampleCommandNameCommand = ExampleCommandNameCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhhbXBsZS1jb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2V4YW1wbGUtY29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsc0NBQStFO0FBUS9FO0lBQUE7SUFrQ0EsQ0FBQztJQWpDRyxzQkFBVyxrREFBVzthQUF0QjtZQUNJLE9BQU8sa0NBQWtDLENBQUM7UUFDOUMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyw4Q0FBTzthQUFsQjtZQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRTtnQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7YUFBRTtZQUVsRixJQUFNLE1BQU0sR0FBd0Q7Z0JBQ2hFLGtCQUFrQixFQUFFO29CQUNoQixLQUFLLEVBQUUsQ0FBQztvQkFDUixJQUFJLEVBQUUsUUFBUTtvQkFDZCxPQUFPLEVBQUUsaUJBQWlCO29CQUMxQixXQUFXLEVBQUUsNEJBQTRCO2lCQUM1QztnQkFFRCxxQkFBcUIsRUFBRTtvQkFDbkIsS0FBSyxFQUFFLENBQUM7b0JBQ1IsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsT0FBTyxFQUFFLHVCQUF1QjtvQkFDaEMsV0FBVyxFQUFFLCtCQUErQjtpQkFDL0M7YUFDSixDQUFDO1lBRUYsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQzs7O09BQUE7SUFFWSx1Q0FBRyxHQUFoQixVQUFpQixJQUFZLEVBQUUsSUFBNkI7Ozs7Z0JBQ3BELE9BQU8sR0FBRyxJQUFxQyxDQUFDO2dCQUVwRCxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQVksSUFBSSwyQkFBeUIsQ0FBQyxDQUFDO2dCQUN2RCxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7O0tBQ2pEO0lBakNRLHlCQUF5QjtRQURyQyxpQkFBTztPQUNLLHlCQUF5QixDQWtDckM7SUFBRCxnQ0FBQztDQUFBLEFBbENELElBa0NDO0FBbENZLDhEQUF5QiJ9