import { gasStationModel } from "../models/gas.station.model.js";

export default class GasStationRepository {
  async getAll() {
    // sort id desc
    return await gasStationModel
      .find()
      .sort({
        id: -1,
      })
      .collation({ locale: "en_US", numericOrdering: true })
      .limit(15)
      .lean();
  }

  async getById(id) {
    return await gasStationModel.findById(id);
  }

  async create(gasStation) {
    return await gasStationModel.create(gasStation);
  }

  async update(id, gasStation) {
    return await gasStationModel.findByIdAndUpdate(id, gasStation);
  }

  async getIdByPropertyId(id) {
    const response = await gasStationModel.find({ id: id });
    return response[0]._id;
  }

  async delete(id) {
    return await gasStationModel.findByIdAndDelete(id);
  }
}
