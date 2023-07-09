import Service from "../models/serviceModel.js";
import createError from "../utils/createError.js";

export const createService = async (req, res, next) => {
  if (!req.isSeller)
    return next(createError(403, "Only sellers can create a service!"));

  const newService = new Service({
    userId: req.userId,
    ...req.body,
  });
  try {
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (err) {
    next(createError(400, "Please Fill all the required fields !!"));
  }
};
export const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);

    if (service.userId !== req.userId)
      return next(createError(403, "You can delete only your service"));

    await Service.findByIdAndDelete(req.params.id);
    res.status(200).send("Service has been deleted");
  } catch (err) {
    next(err);
  }
};
export const getService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return next(createError(404, "Service not found"));
    res.status(200).send(service);
  } catch (err) {
    next(err);
  }
};
export const getServices = async (req, res, next) => {
  const rq = req.query;
  try {
    const filters = {
      ...(rq.userId && { userId: rq.userId }),
      ...(rq.cat && { cat: rq.cat }),
      ...((rq.min || rq.max) && {
        price: {
          ...(rq.min && { $gt: rq.min }),
          ...(rq.max && { $lt: rq.max }),
        },
      }),
      ...(rq.search && { title: { $regex: rq.search, $options: "i" } }),
    };
    const services = await Service.find(filters)
      .sort({ [rq.sort]: -1 })
      .limit(rq.lim);
    res.status(200).send(services);
  } catch (err) {
    next(err);
  }
};
