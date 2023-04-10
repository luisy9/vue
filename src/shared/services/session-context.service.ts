import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { DataContextDto } from "../dtos/data-context.dto";
import { UserDto } from "../dtos/user.dto";

const DATA_CONTEXT = 'data-context';

export class SessionContextService {
  dataContext = new BehaviorSubject<DataContextDto>(new DataContextDto());

  updateDataContext(dataContext: DataContextDto) {
    this.dataContext.next(dataContext);
    sessionStorage.setItem(DATA_CONTEXT, JSON.stringify(dataContext));
  }

  updateUser(user: UserDto): void {
    const dataContext = this.dataContext.value;
    dataContext.user = user;
    this.updateDataContext(dataContext);
  }

  getUser(): UserDto {
    if (!this.dataContext.value) {
      this.getSessionContext();
    }
    return this.dataContext.value?.user as UserDto;
  }


  getSessionContext(): DataContextDto {
    const obj = sessionStorage.getItem(DATA_CONTEXT);
    const data: DataContextDto = JSON.parse(obj as string);
    this.dataContext.next(data);
    return data;
  }

  clearDataContext(): void {
    sessionStorage.removeItem(DATA_CONTEXT);
  }

}

export const sessionContextService = new SessionContextService();
