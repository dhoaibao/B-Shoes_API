const { ObjectId } = require("mongodb");

class AccountService {
    constructor(client) {
        this.Account = client.db().collection("accounts");
    }

    extractAccountData(payload) {
        const account = {
            name: payload.name,
            gender: payload.gender,
            phone: payload.phone,
            email: payload.email,
            address: payload.address,
            username: payload.username,
            password: payload.password,
        };

        Object.keys(account).forEach(
            (key) => account[key] === undefined && delete account[key]
        );
        return account;
    }

    async create(payload) {
        const account = this.extractAccountData(payload);
        const result = await this.Account.findOneAndUpdate(
            account,
            { $set: { featured: account.featured === true } },
            { returnDocument: "after", upsert: true }
        );
        return result.value;    
    }

    async find(filter) {
        const cursor = await this.Account.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }

    async findById(id) {
        return await this.Account.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractAccountData(payload);
        const result = await this.Account.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Account.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async deleteAll() {
        const result = await this.Account.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = AccountService;