import { Subject } from 'rxjs';
import { io } from 'socket.io-client';
import { API } from '../api';

class SocketioService {

  socketUuid: any;
  socket: any;
  $zipFile = new Subject<void>();

  constructor() {}
  
  setupSocketConnection = () => {
    //  this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);
    this.socket = io(API.webApiBase, { transports: ["websocket"] });

    // Events config
    this.socket.on('user-connected', (msg: any) => {
      console.log('user-connected', msg);
      this.socketUuid = msg.uuid;
    });

    this.socket.on('run-generator', (msg: any) => {
      console.log('run-generator', msg);
      // this.socketUuid = msg.uuid;
    });

    this.socket.on('zip-generated', (msg: any) => {
      console.log('zip-generated', msg);
      this.$zipFile.next(msg);
    });

  }
  
  disconnect = () => {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  getSocketUuid = () => {
    return this.socketUuid;
  }

  destroySubject() {
    this.$zipFile.unsubscribe();
    this.$zipFile.closed = false;
    this.$zipFile.isStopped = false;
    this.$zipFile.observers = [];
  }

}

export const socketioService = new SocketioService();