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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var mqtt = __importStar(require("mqtt"));
var readline = __importStar(require("readline"));
var command_1 = require("../command");
var ExampleCommandNameCommand = /** @class */ (function () {
    function ExampleCommandNameCommand() {
    }
    Object.defineProperty(ExampleCommandNameCommand.prototype, "description", {
        get: function () {
            return "Parses hcidump output";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExampleCommandNameCommand.prototype, "options", {
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
    ExampleCommandNameCommand.prototype.run = function (name, opts) {
        return __awaiter(this, void 0, void 0, function () {
            var options, id, terminal, record, buffer, proceed, client;
            var _this = this;
            return __generator(this, function (_a) {
                options = opts;
                id = uuid_1.v1();
                terminal = readline.createInterface({
                    input: process.stdin, output: process.stdout
                });
                record = null;
                buffer = [];
                terminal.on('line', function (line) {
                    if (line.startsWith('> HCI Event: ')) {
                        if (record) {
                            buffer.push(record);
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
                proceed = true;
                terminal.on('close', function () {
                    proceed = false;
                });
                client = mqtt.connect('mqtt://localhost');
                client.on('connect', function () { return __awaiter(_this, void 0, void 0, function () {
                    var _loop_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _loop_1 = function () {
                                    var records_1, e_1;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 500); })];
                                            case 1:
                                                _a.sent();
                                                if (!(buffer.length > 0)) return [3 /*break*/, 5];
                                                records_1 = buffer;
                                                buffer = [];
                                                _a.label = 2;
                                            case 2:
                                                _a.trys.push([2, 4, , 5]);
                                                return [4 /*yield*/, new Promise(function (resolve, reject) {
                                                        client.publish('presence', JSON.stringify({
                                                            id: id,
                                                            records: records_1
                                                        }), { qos: 2, retain: true, }, function (err) {
                                                            if (err) {
                                                                reject(err);
                                                            }
                                                            else {
                                                                resolve(err);
                                                            }
                                                        });
                                                    })];
                                            case 3:
                                                _a.sent();
                                                return [3 /*break*/, 5];
                                            case 4:
                                                e_1 = _a.sent();
                                                buffer = records_1.concat(buffer);
                                                return [3 /*break*/, 5];
                                            case 5: return [2 /*return*/];
                                        }
                                    });
                                };
                                _a.label = 1;
                            case 1:
                                if (!proceed) return [3 /*break*/, 3];
                                return [5 /*yield**/, _loop_1()];
                            case 2:
                                _a.sent();
                                return [3 /*break*/, 1];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3VwbG9hZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZCQUFrQztBQUVsQyx5Q0FBNkI7QUFDN0IsaURBQXFDO0FBR3JDLHNDQUErRTtBQWlCL0U7SUFBQTtJQWtHQSxDQUFDO0lBakdHLHNCQUFXLGtEQUFXO2FBQXRCO1lBQ0ksT0FBTyx1QkFBdUIsQ0FBQztRQUNuQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLDhDQUFPO2FBQWxCO1lBQ0ksSUFBTSxNQUFNLEdBQXdEO2dCQUNoRSxrQkFBa0IsRUFBRTtvQkFDaEIsS0FBSyxFQUFFLENBQUM7b0JBQ1IsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsT0FBTyxFQUFFLGlCQUFpQjtvQkFDMUIsV0FBVyxFQUFFLDRCQUE0QjtpQkFDNUM7Z0JBRUQscUJBQXFCLEVBQUU7b0JBQ25CLEtBQUssRUFBRSxDQUFDO29CQUNSLElBQUksRUFBRSxRQUFRO29CQUNkLE9BQU8sRUFBRSx1QkFBdUI7b0JBQ2hDLFdBQVcsRUFBRSwrQkFBK0I7aUJBQy9DO2FBQ0osQ0FBQztZQUVGLE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUM7OztPQUFBO0lBRVksdUNBQUcsR0FBaEIsVUFBaUIsSUFBWSxFQUFFLElBQTZCOzs7OztnQkFDbEQsT0FBTyxHQUFHLElBQXFDLENBQUM7Z0JBQ2hELEVBQUUsR0FBRyxTQUFJLEVBQUUsQ0FBQztnQkFFWixRQUFRLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQztvQkFDdEMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO2lCQUMvQyxDQUFDLENBQUM7Z0JBRUMsTUFBTSxHQUFXLElBQXFCLENBQUM7Z0JBQ3ZDLE1BQU0sR0FBYSxFQUFFLENBQUM7Z0JB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