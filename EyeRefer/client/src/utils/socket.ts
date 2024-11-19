import { Local } from '../environment/env';
import {io} from "socket.io-client"
export const socket = io(`${Local.BASE_URL}`);