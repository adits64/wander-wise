import Trip from "../models/trip.js";
import { NotFoundError } from "../errors/not-found.js";
import { ConflictError } from "../errors/conflict.js";
import { generateAccessToken } from "../config/jwt.js";
import sendMail from "../utils/send-mail.js";

export const create = async (data, userId) => {
  const trip = await Trip.create({ ...data, user: userId });
  return trip;
};

export const getAll = async (userId) => {
  const trips = await Trip.find({
    $or:[ {user: userId }, {collaborators: userId}],
});
  return trips;
};

export const getOne = async (id, userId) => {
  const trip = await Trip.findOne({
    _id: id,
    $and:[
      { $or: [ {user: userId }, {collaborators: userId}],}
    ],
  })
  if (!trip) throw new NotFoundError("Trip not found");
  return trip;
};

export const update = async (id, tripData, userId) => {
  const trip = await Trip.findOneAndUpdate(
    { _id: id, user: userId },
    tripData,
    { returnDocument: 'after' }
  );
  if (!trip) throw new NotFoundError("Trip not found");
  return trip;
};

export const destroy = async (id, userId) => {
  const trip = await Trip.findOneAndDelete({ _id: id, user: userId });
  if (!trip)throw new NotFoundError("Trip not found");
  return trip;
};

export const inviteCollaborator = async (id, userId, collaboratorEmails) => {
  const trip = await getOne(id, userId);

  if (
    trip.collaborators?.some((collaborator) =>
      collaboratorEmails.includes(collaborator.email)
    )
  ) {
    throw new ConflictError("Collaborator already invited");
  }

  const token = await generateAccessToken({ tripId: id }, '1h');

  const invitationLink = `${process.env.BASE_URL}/trips/${id}/invite/accept?token=${token}`;

  await sendMail(collaboratorEmails.join(","), "Invitation to join a trip", {
    link: invitationLink,
    title: trip.title,
    startDate: trip.startDate.toDateString(),
    endDate: trip.endDate.toDateString(),
    name: trip.user.name,
  });

  return { message: "Collaborators invited successfully" };
}

export const acceptInvite = async() => {
  const decoded = mverifyAccessToken(token);
  const trip = await Trip.findOne({_id: decoded.tripid}).populate(
    "colaborators"
  );

  if(!trip) throw new NotFoundError("Trip NotFound");
  if(
    trip.collaborators.some(
      (collaborator) => collaborator._id.toString()=== userid.toString()
    )
  )

trip.collaborators.push(userId);
await trip.save();
return {message: "Invitation accepted successfully"};
}