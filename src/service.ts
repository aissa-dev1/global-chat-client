import { AuthService } from "./services/auth";
import { MessageService } from "./services/message";

class Service {
  readonly auth = new AuthService();
  readonly message = new MessageService();
}

export const service = new Service();
