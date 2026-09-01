import { Router } from "express";
import { create, destroy, getAll, getOne, inviteCollaborator, update } from "../services/trip.js";
import { createTripValidator, updateTripValidator } from "../validators/trip.js";

const TRIP_ROUTER = Router();

TRIP_ROUTER.post(
  "/",
  createTripValidator,
  async (req, res, next) => {
    try {
      const trip = await create(req.body, req.user);
      res.status(201).json({ data: trip });
    } catch (error) {
      next(error);
    }
  }
);

TRIP_ROUTER.get(
  "/",
  async (req, res, next) => {
    try {
      const trips = await getAll(req.user);
      res.status(200).json({ data: trips });
    } catch (error) {
      next(error);
    }
  }
);

TRIP_ROUTER.get(
  "/:id",
  async (req, res, next) => {
    try {
      const trip = await getOne(req.params.id, req.user);
      res.status(200).json({ data: trip });
    } catch (error) {
      next(error);
    }
  }
);

TRIP_ROUTER.patch(
  "/:id",
  updateTripValidator,
  async (req, res, next) => {
    try {
      const trip = await update(req.params.id, req.body, req.user);
      res.status(200).json({ data: trip });
    } catch (error) {
      next(error);
    }
  }
);

TRIP_ROUTER.delete(
  "/:id",
  async (req, res, next) => {
    try {
      const trip = await destroy(req.params.id, req.user);
      res.status(200).json({ data: trip });
    } catch (error) {
      next(error);
    }
  }
);

TRIP_ROUTER.post(
  "/:id/invite",
  async (req, res, next) => {
    try {
      const result = await inviteCollaborator(
        req.params.id,
        req.user,
        req.body.collaboratorEmails
      );
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

TRIP_ROUTER.get(
  "/:id/invite/accept",
  async (req,res,next) =>{
    try{
      const result = await acceptInvite(req.query,TokenExpiredError, req.user);
      res.status(200).json({data:result});
  }catch(error){
    next(error);
  }
  })

export default TRIP_ROUTER;
