import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    register(dto: RegisterDto): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        todos: import("../entities").Todo[];
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
    }>;
    validateUser(userId: string): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        todos: import("../entities").Todo[];
    }>;
}
