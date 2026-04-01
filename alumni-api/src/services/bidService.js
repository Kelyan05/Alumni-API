const biddao = require('../daos/biddao');
const alumnidao = require('../daos/alumnidao');
const createResponse = require('../utils/response');

class bidservice {
  constructor() {
    this.dao = new biddao();
    this.alumniDao = new alumnidao();
  }

  // Place a new bid
  async create(req) {
    const { amount } = req.body;
    const alumniID = req.user.id;

    // Check if user has an existing highest bid
    const currentBid = await this.dao.getUserHighestBid(alumniID);

    if (amount <= currentBid.data) {
      return createResponse(false, null, 'New bid must be higher than current bid');
    }

    // Either insert or update the bid
    if (currentBid.data === 0) {
      return await this.dao.create(alumniID, amount);
    } else {
      return await this.dao.updateBid(alumniID, amount);
    }
  }

  // Get the status of the user's bid (Winning / Losing)
  async getStatus(req) {
    const alumniID = req.user.id;

    const highestBid = await this.dao.getHighestBid();
    const userBid = await this.dao.getUserHighestBid(alumniID);

    if (!highestBid.success || !userBid.success) {
      return createResponse(false, null, 'Error fetching bid status');
    }

    const status = userBid.data === highestBid.data ? 'Winning' : 'Losing';
    return createResponse(true, { status, yourBid: userBid.data, highestBid: highestBid.data });
  }
}

module.exports = bidservice;