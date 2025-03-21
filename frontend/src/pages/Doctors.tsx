import DoctorCard from "@/components/chat/DoctorCard";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { doctorsData } from "@/data/doctors";
import { MapPin, Phone, Search, UserRound } from "lucide-react";
import { useState } from "react";

const Doctors = () => {
  const [searchItem, setSearchItem] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const generatePaginationLinks = () => {
    const maxPagesToShow = 5; // Maximum number of page links to show
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Adjust if we're near the end
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    const pages = [];

    // Add first page with ellipsis if needed
    if (startPage > 1) {
      pages.push(
        <PaginationItem key="page-1">
          <PaginationLink
            onClick={() => setCurrentPage(1)}
            className="cursor-pointer"
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (startPage > 2) {
        pages.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={`page-${i}`}>
          <PaginationLink
            isActive={currentPage === i}
            onClick={() => setCurrentPage(i)}
            className="cursor-pointer"
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Add last page with ellipsis if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      pages.push(
        <PaginationItem key={`page-${totalPages}`}>
          <PaginationLink
            onClick={() => setCurrentPage(totalPages)}
            className="cursor-pointer"
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  // Filter doctors based on search item
  const filteredDoctors = doctorsData.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchItem.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchItem.toLowerCase()) ||
      doctor.location.toLowerCase().includes(searchItem.toLowerCase()) ||
      doctor.disease.toLowerCase().includes(searchItem.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastDoctor = currentPage * itemsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - itemsPerPage;
  const currentDoctors = filteredDoctors.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor
  );
  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Find Specialized Doctor</h1>

      {/* Search Bar */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-10"
          placeholder="Search by name, disease, or location..."
          value={searchItem}
          onChange={(e) => {
            setSearchItem(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Doctors grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {currentDoctors.length > 0 ? (
          currentDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))
        ) : (
          <div className="col">
            No doctors found matching your search criteria.
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredDoctors.length > itemsPerPage && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {generatePaginationLinks()}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default Doctors;
