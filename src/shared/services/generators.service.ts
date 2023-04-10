/* import {API} from '../api';
import {ItiString} from '@iti/vue-core';
import {OrganizationDto} from '../dtos/organization.dto';
import {WorkGroupDto} from '../dtos/workgroup.dto';
import {RegisterDto} from '../dtos/register.dto';
import {httpService} from './http.service'; */

export default class GeneratorsService {
/*   public userName: string = ItiString.Empty;

  public async register(register: RegisterDto) {
    const res = await httpService.post(API.registration, register.toJson(), true, false, true);
    return res ? true : false;
  }

  public async getOrganizations(): Promise<OrganizationDto[]> {
    const res = await httpService.get(API.organizationsPublicActive);
    return res;
  }

  public async getWorkgroup(id: number): Promise<WorkGroupDto[]> {
    const res = await httpService.get(ItiString.Format(API.workGroupsPublic, id));
    return res;
  }
 */
}

export const generatorsService = new GeneratorsService();
