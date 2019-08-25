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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const mqtt = __importStar(require("mqtt"));
const readline = __importStar(require("readline"));
const command_1 = require("../command");
let ExampleCommandNameCommand = class ExampleCommandNameCommand {
    get description() {
        return "Parses hcidump output";
    }
    get options() {
        const result = {
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
    }
    run(name, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = opts;
            const id = uuid_1.v1();
            const terminal = readline.createInterface({
                input: process.stdin, output: process.stdout
            });
            let record = null;
            let buffer = [];
            terminal.on('line', line => {
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
            let proceed = true;
            terminal.on('close', () => {
                proceed = false;
            });
            const client = mqtt.connect('mqtt://localhost');
            client.on('connect', () => __awaiter(this, void 0, void 0, function* () {
                while (proceed) {
                    yield new Promise(resolve => setTimeout(resolve, 500));
                    if (buffer.length > 0) {
                        const records = buffer;
                        buffer = [];
                        try {
                            yield new Promise((resolve, reject) => {
                                client.publish('presence', JSON.stringify({
                                    id,
                                    records
                                }), { qos: 2, retain: true, }, (err) => {
                                    if (err) {
                                        reject(err);
                                    }
                                    else {
                                        resolve(err);
                                    }
                                });
                            });
                        }
                        catch (e) {
                            buffer = records.concat(buffer);
                        }
                    }
                }
            }));
            // client.on('message', (topic, message) => {
            //     console.log([topic, message.toString()]);
            //     client.end();
            // });
        });
    }
};
ExampleCommandNameCommand = __decorate([
    command_1.Command
], ExampleCommandNameCommand);
exports.ExampleCommandNameCommand = ExampleCommandNameCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3VwbG9hZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtCQUFrQztBQUVsQywyQ0FBNkI7QUFDN0IsbURBQXFDO0FBR3JDLHdDQUErRTtBQWlCL0UsSUFBYSx5QkFBeUIsR0FBdEMsTUFBYSx5QkFBeUI7SUFDbEMsSUFBVyxXQUFXO1FBQ2xCLE9BQU8sdUJBQXVCLENBQUM7SUFDbkMsQ0FBQztJQUVELElBQVcsT0FBTztRQUNkLE1BQU0sTUFBTSxHQUF3RDtZQUNoRSxrQkFBa0IsRUFBRTtnQkFDaEIsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGlCQUFpQjtnQkFDMUIsV0FBVyxFQUFFLDRCQUE0QjthQUM1QztZQUVELHFCQUFxQixFQUFFO2dCQUNuQixLQUFLLEVBQUUsQ0FBQztnQkFDUixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsdUJBQXVCO2dCQUNoQyxXQUFXLEVBQUUsK0JBQStCO2FBQy9DO1NBQ0osQ0FBQztRQUVGLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFWSxHQUFHLENBQUMsSUFBWSxFQUFFLElBQTZCOztZQUN4RCxNQUFNLE9BQU8sR0FBRyxJQUFxQyxDQUFDO1lBQ3RELE1BQU0sRUFBRSxHQUFHLFNBQUksRUFBRSxDQUFDO1lBRWxCLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUM7Z0JBQ3RDLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTthQUMvQyxDQUFDLENBQUM7WUFFSCxJQUFJLE1BQU0sR0FBVyxJQUFxQixDQUFDO1lBQzNDLElBQUksTUFBTSxHQUFhLEVBQUUsQ0FBQztZQUUxQixRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxJQUFJ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