import { injectable } from 'inversify';
import { Collection, MongoClient, WithId } from 'mongodb';
import { User } from '../interfaces';

const url = 'mongodb://127.0.0.1:27017';

@injectable()
/*
* Cette classe s'occupe des communications avec MongoDB
*/
export class MongodbService {

    private _client: MongoClient = new MongoClient(url);
    private _collection: Collection<User>;
    
    constructor(){
        this._client.connect();
        //Collection à utiliser
        this._collection = this._client.db('tp2').collection<User>('users');
    }
    
    //Retourne les informations d'un utilisateur à partir de son username
    async getUserByUsername(username: string):Promise<WithId<User> | null>{
        console.log('==> username=' + username);
        //TODO Trouver l'utilisateur en fonction de son nom d'utilisateur
        const userdb = await this._collection.findOne({username: username});
        
        //TODO Retourner l'utilisateur avec son _id
        return userdb;
    }
    
    //Fait la création d'un utilisateur dans la base de données
    async createUser(user: User): Promise<WithId<User> | null>{
        console.log('==> user=' + user.username);
        console.log('==> hash=' + user.hash);

        //TODO Créer un utilisateur en fonction des information d'authentification
        //Utilisez l'interface User
        const aUser:User = {hash:user.hash, username:user.username};

        await this._collection.insertOne(aUser);

        const userdb = await this.getUserByUsername(user.username);

        //TODO Retourner le user créé avec son _id
        //TODO Retourner le user créé avec son _id
        return userdb;
    }
}