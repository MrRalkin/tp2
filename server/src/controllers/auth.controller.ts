import { Router, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Authentification } from '../../../common/authentification';
import { UserConnection } from '../../../common/userConnection';
import { User } from '../interfaces';
import { AuthService } from '../services/auth.service';
import { MongodbService } from '../services/mongodb.service';
import { TYPES } from '../types';


@injectable()
export class AuthController{
    public constructor(@inject(TYPES.AuthService) private _authService: AuthService, 
                       @inject(TYPES.MongodbService) private _mongodbService: MongodbService){
        //empty
    }

    public get router() : Router {
        
        const router: Router = Router();

        // -> /api/v1/auth/login
        router.post('/login',async (req:Request, res: Response) => {
            const auth: Authentification = req.body;

            //TODO Trouver l'utilisateur dans la BD, si l'utilisateur est null retournez le code 403
            const user = await this._mongodbService.getUserByUsername(auth.username);
            if (user === null)
            {
                res.status(403).json({errMessage:'Usager ou mot de passe invalide!'});
            }
            else
            {
                //TODO Comparer le mot de passe de la BD avec le mot de passe de la requête, utiliser le auth.service
                //Retournez le code 403 au besoin
                const isValid = await this._authService.isPasswordValid(auth.password, user.hash);

                if (isValid)
                {
                    //TODO Générer le jeton de l'utilisateur à l'aide du service auth.service
                    const token = await this._authService.generateToken(user._id.toString());

                    //TODO Retourner les informations de connexion de l'utilisateur (voir interface UserConnection) sous format json 
                    const userConnection:UserConnection = {id:user._id, token:token, username:user.username};

                    res.status(200).json(userConnection);
                }
                else
                {
                    res.status(403).json({errMessage:'Usager ou mot de passe invalide!'});
                }
            }
        });
        
        // -> /api/v1/auth/signup
        router.post('/signup',async (req:Request, res: Response) => {
            const auth: Authentification = req.body;

            //TODO Valider que l'utilisateur (username) n'est pas déjà dans la BD
            //Retounez un code 405 si déjà présent
            const user = await this._mongodbService.getUserByUsername(auth.username);
            if (user != null)
            {
                res.status(405).json({errMessage:'Usager déjà existant!'});
            }
            else
            {
                const aUserSignUp:User = {username:auth.username, hash:''};
                //TODO Chiffrer le mot de passe avec auth.service
                await this._authService.encryptPassword(auth.password).then((h) => aUserSignUp.hash = h);
                //TODO Ajouter l'utilisateur à la BD
                //Retounez un code 500 en cas de problème
                const user = await this._mongodbService.createUser(aUserSignUp);
                if (user != null)
                {
                    //TODO Générer le jeton de l'utilisateur à l'aide du service auth.service
                    const token = await this._authService.generateToken(user._id.toString());
                
                    //TODO Retourner les informations de connexion de l'utilisateur (voir interface UserConnection) sous format json 
                    const userConnection:UserConnection = {id:user._id, token:token, username:user.username};
                   
                    res.status(200).json(userConnection);
                }
                else
                {
                    res.status(500).json({errMessage:'Impossible de sauvegarder l\'usager'});
                }
            }
        });
         
        return router;
    }
}