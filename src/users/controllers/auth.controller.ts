 import {
   Body,
   Controller,
   Get,
   Post,
   Put,
   Session,
   UseGuards,
 } from '@nestjs/common';
 import { CurrentUser } from 'src/decorators/current-user.decorator';
 import { AuthGuard } from 'src/guards/auth.guard';
 import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
 import { LocalAuthGuard } from 'src/guards/local-auth.guard';
//  import { Serialize } from 'src/interceptors/serialize.interceptor';
//  import { ProfileDto } from '../dtos/profile.dto';
//  import { RegisterDto } from '../dtos/register.dto';
//  import { UserDto } from '../dtos/user.dto';
//  import { UserDocument } from '../schemas/user.schema';
 import { AuthService } from '../services/auth.service';
 import { UsersService } from '../services/users.service';
import { RegisterDto } from '../dtos/register.dto';
import { User } from '../user.entity';
import { ProfileDto } from '../dtos/profile.dto';

//  @Serialize(UserDto)
 @Controller('auth')
 export class AuthController {
   constructor(
     private authService: AuthService,
     private usersService: UsersService
   ) {}

   @UseGuards(LocalAuthGuard)
   @Post('login')
   async login(@CurrentUser() user: User, @Session() session: any) {
     const { name, password, email, role,id } = user;

     const { accessToken } = await this.authService.login(name, password);

     const loggedUser = { name, id, role, email, accessToken };

     session.user = loggedUser;

     return loggedUser;
   }

   @UseGuards(JwtAuthGuard)
   @Get('profile')
   getProfile(@Session() session: any) {
     return session.user;
   }

   @Post('logout')
   async logout(@Session() session: any) {
     session.user = null;
   }

   @Post('register')
   async register(
     @Body() { name, email, password }: RegisterDto,
     @Session() session: any
   ) {
     const user = await this.authService.register(name, email, password);

     const { id, role } = user;

     const { accessToken } = await this.authService.login(name, user.id);

     const loggedUser = {
       name: user.name,
       id,
       role,
       email: user.email,
       accessToken,
     };

     session.user = loggedUser;

     return loggedUser;
   }

//    @UseGuards(AuthGuard)
//    @Put('profile')
//    async updateUser(@Body() credentials: ProfileDto, @Session() session: any) {
//      const user = await this.usersService.update(session.user._id, credentials);

//      const {} = user;

//      const updatedUser = {
//        name,
//        id,
//        role,
//        email,
//        accessToken: session.user.accessToken,
//      };

//      session.user = updatedUser;

//      return updatedUser;
//    }
 }
