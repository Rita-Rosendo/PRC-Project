export default class Patient {
  constructor(belongs_to, room_amenities,room_features,room_type,url) {
    this.belongs_to = belongs_to;
    this.room_amenities = room_amenities;
    this.room_features = room_features;
    this.room_type = room_type;
    this.url = url;
  }
}
