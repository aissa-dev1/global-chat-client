import axios from "axios";

export interface AuthenticateData {
  username: string;
  password: string;
}

type AuthenticateStatus = "exist" | "created";

interface AuthenticateReturn {
  token: string;
  status: AuthenticateStatus;
}

export class AuthService {
  async authenticate(data: AuthenticateData): Promise<AuthenticateReturn> {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URI}/auth`,
      data
    );
    return response.data;
  }
}
