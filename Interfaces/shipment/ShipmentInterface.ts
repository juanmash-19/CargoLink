export interface ShipmentDTO{
    imageUrl?: string,
    pickupAddress? : string,
    deliveryAddress? : string,
    title? : string,
    description? : string,
    weight? : number,
    dimensions? : {
      height? : number,
      width? : number,
      length? : number,
    },
    pickupTime?: Date,
    status?: string,
    transporter?: string,
}

export interface DimensionsDAO {
  height: number,
  width: number,
  length: number,
}

export interface ClientDAO {
  _id: string,
  name: string,
  email: string,
  phone: string,
}

export interface TransporterDAO {
  _id: string,
  name: string,
  email: string,
  phone: string,
}

export interface ShipmentDAO {
    message?: string,
    shipment: {
        _id: string,
        imageUrl?: string,
        pickupAddress: string,
        deliveryAddress: string,
        title: string,
        description: string,
        weight: number,
        dimensions: DimensionsDAO,
        pickupTime?: Date,
        cost: number,
        status: string,
        client: ClientDAO,
        transporter?: TransporterDAO,
        __v?: number,
    }
}

export interface ShipmentsDAO {
    message?: string,
    shipments: ShipmentDAO[],
}