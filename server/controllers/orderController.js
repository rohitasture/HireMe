import Order from "../models/orderModel.js";
import Service from "../models/serviceModel.js";
import Stripe from "stripe";

export const intent = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE);
  try {
    const service = await Service.findById(req.params.id);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: service.price * 100,
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    const newOrder = new Order({
      serviceId: service._id,
      img: service.cover,
      title: service.title,
      buyerId: req.userId,
      sellerId: service.userId,
      price: service.price,
      payment_intent: paymentIntent.id,
    });
    await newOrder.save();
    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    next(err);
  }
};

export const confirmOrder = async (req, res, next) => {
  try {
    const orders = await Order.findOneAndUpdate(
      { payment_intent: req.body.payment_intent },
      {
        $set: {
          isCompleted: true,
        },
      },
      {
        new: true,
      }
    );
    await Service.findByIdAndUpdate(orders.serviceId, {
      $inc: {
        sales: 1,
      },
    });
    res.status(200).send("Order has been Confirmed!!");
  } catch (err) {
    next(err);
  }
};
export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    });
    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};
