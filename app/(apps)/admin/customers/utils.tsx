import { FullCustomerDetails } from "@/lib/types";

export const formatCustomerWalkins = (customer: FullCustomerDetails) => {
  let formatedWalkins: any = [];

  try {
    customer.walkins.forEach((walkin) => {
      let vehicle = customer.customerVehicle.find(
        (x) => x.id == walkin.vehicleId
      );

      formatedWalkins.push({
        id: walkin.id,
        vehicle: `${vehicle?.year} ${vehicle?.vehicle.make} ${vehicle?.vehicle.model}, ${vehicle?.registrationNumber}, ${vehicle?.colour}`,
        branch: walkin.branch.name,
        condition: walkin.condition,
        status: walkin.status,
        authorized: walkin.authorized,
        createdAt: walkin.createdAt.toISOString(),
        updatedAt: walkin.updatedAt.toISOString(),
      });
    });

    return formatedWalkins;
  } catch (e) {
    throw new Error("Could not format quotations");
  }
};
