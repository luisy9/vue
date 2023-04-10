// Aqui se centralizan los strings de las rutas al API
export class API {

  public static webApiBase = import.meta.env.VITE_APP_ROOT_API;

  public static login = API.webApiBase + 'login';

  // public static publicUrl = API.webApiBase + 'public';

  // public static users = API.webApiBase + 'user';

  // public static userData = API.users + '/data';

  // public static activeUsers = API.users + '/active?isActive=true';

  // public static tokenUsers = API.users + '/token';

  // public static userPicture = API.users + '/picture/{0}';

  // public static organizationsWorkgroupsUser = API.users + '/organizations/workgroups/{0}';

  // public static user = API.users + '/{0}'; 

  public static generators = API.webApiBase + '/generators';

  public static generator = API.webApiBase + '/generator';
  
}