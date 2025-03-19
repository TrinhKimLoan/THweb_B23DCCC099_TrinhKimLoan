import { useState, useCallback } from 'react';
import { getServices, addService, updateService, deleteService } from '@/services/management/admin/serviceService';

export default function useServiceModel() {
 const [services, setServices] = useState([]); //Danh sách dịch vụ
 const [loading, setLoading] = useState(false); //Trạng thái loading

 const fetchServices = useCallback(async () => {
   setLoading(true);
   try {
     const response = await getServices();
     setServices(response);
   } catch (error) {
     console.error("Error fetching services:", error);
   }
   setLoading(false);
 }, []);

 const addNewService = async (data: any) => {
   try {
     await addService(data);
     fetchServices();
   } catch (error) {
     console.error("Error adding service:", error);
   }
 };

 const updateServiceData = async (id: number, data: any) => {
   try {
     await updateService(id, data);
     fetchServices();
   } catch (error) {
     console.error("Error updating service:", error);
   }
 };

 const deleteServiceData = async (id: number) => {
   try {
     await deleteService(id);
     fetchServices();
   } catch (error) {
     console.error("Error deleting service:", error);
   }
 };

 return {
   services,
   loading,
   fetchServices,
   addNewService,
   updateServiceData,
   deleteServiceData,
 };
}
