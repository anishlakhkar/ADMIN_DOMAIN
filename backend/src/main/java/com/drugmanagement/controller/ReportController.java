package com.drugmanagement.controller;

import com.drugmanagement.dto.InventoryValuationReportResponse;
import com.drugmanagement.dto.LowStockReportResponse;
import com.drugmanagement.dto.RecentReportResponse;
import com.drugmanagement.dto.ReportRequest;
import com.drugmanagement.service.ReportFileGenerator;
import com.drugmanagement.service.ReportService;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.io.IOException;
import java.util.List;

@Path("/api/reports")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ReportController {
    
    @Inject
    ReportService reportService;
    
    @Inject
    ReportFileGenerator fileGenerator;
    
    /**
     * Generate report based on type
     * POST /api/reports/generate
     */
    @POST
    @Path("/generate")
    public Response generateReport(@Valid ReportRequest request) {
        try {
            // Validate report type
            if (!request.getReportType().equals("inventory-valuation") && 
                !request.getReportType().equals("low-stock")) {
                return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new ErrorResponse("Invalid report type. Must be 'inventory-valuation' or 'low-stock'"))
                    .build();
            }
            
            // Validate date range
            if (request.getStartDate().isAfter(request.getEndDate())) {
                return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new ErrorResponse("Start date must be before or equal to end date"))
                    .build();
            }
            
            // Validate format
            if (!request.getFormat().equalsIgnoreCase("pdf") && 
                !request.getFormat().equalsIgnoreCase("xlsx") && 
                !request.getFormat().equalsIgnoreCase("csv")) {
                return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new ErrorResponse("Invalid format. Must be 'pdf', 'xlsx', or 'csv'"))
                    .build();
            }
            
            // Generate report data
            Object reportResponse;
            String fileName;
            byte[] fileContent = null;
            String contentType = MediaType.APPLICATION_JSON;
            
            if (request.getReportType().equals("inventory-valuation")) {
                InventoryValuationReportResponse response = reportService.generateInventoryValuationReport(
                    request.getStartDate(), request.getEndDate(), request.getFormat());
                reportResponse = response;
                fileName = "Inventory_Valuation_Report_" + request.getStartDate() + "_to_" + request.getEndDate();
                
                // Generate file if format is not JSON
                if (request.getFormat().equalsIgnoreCase("pdf")) {
                    try {
                        fileContent = fileGenerator.generateInventoryValuationPDF(response);
                        contentType = "application/pdf";
                        fileName += ".pdf";
                    } catch (IOException e) {
                        return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                            .entity(new ErrorResponse("Error generating PDF: " + e.getMessage()))
                            .build();
                    }
                } else if (request.getFormat().equalsIgnoreCase("xlsx")) {
                    try {
                        fileContent = fileGenerator.generateInventoryValuationXLSX(response);
                        contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                        fileName += ".xlsx";
                    } catch (IOException e) {
                        return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                            .entity(new ErrorResponse("Error generating XLSX: " + e.getMessage()))
                            .build();
                    }
                } else if (request.getFormat().equalsIgnoreCase("csv")) {
                    try {
                        fileContent = fileGenerator.generateInventoryValuationCSV(response);
                        contentType = "text/csv";
                        fileName += ".csv";
                    } catch (IOException e) {
                        return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                            .entity(new ErrorResponse("Error generating CSV: " + e.getMessage()))
                            .build();
                    }
                }
            } else {
                LowStockReportResponse response = reportService.generateLowStockReport(
                    request.getStartDate(), request.getEndDate(), request.getFormat());
                reportResponse = response;
                fileName = "Low_Stock_Report_" + request.getStartDate() + "_to_" + request.getEndDate();
                
                // Generate file if format is not JSON
                if (request.getFormat().equalsIgnoreCase("pdf")) {
                    try {
                        fileContent = fileGenerator.generateLowStockPDF(response);
                        contentType = "application/pdf";
                        fileName += ".pdf";
                    } catch (IOException e) {
                        return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                            .entity(new ErrorResponse("Error generating PDF: " + e.getMessage()))
                            .build();
                    }
                } else if (request.getFormat().equalsIgnoreCase("xlsx")) {
                    try {
                        fileContent = fileGenerator.generateLowStockXLSX(response);
                        contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                        fileName += ".xlsx";
                    } catch (IOException e) {
                        return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                            .entity(new ErrorResponse("Error generating XLSX: " + e.getMessage()))
                            .build();
                    }
                } else if (request.getFormat().equalsIgnoreCase("csv")) {
                    try {
                        fileContent = fileGenerator.generateLowStockCSV(response);
                        contentType = "text/csv";
                        fileName += ".csv";
                    } catch (IOException e) {
                        return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                            .entity(new ErrorResponse("Error generating CSV: " + e.getMessage()))
                            .build();
                    }
                }
            }
            
            // Return file if generated, otherwise return JSON
            if (fileContent != null) {
                return Response.ok(fileContent)
                    .header("Content-Disposition", "attachment; filename=\"" + fileName + "\"")
                    .type(contentType)
                    .build();
            } else {
                return Response.ok(reportResponse).build();
            }
            
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                .entity(new ErrorResponse("Error generating report: " + e.getMessage()))
                .build();
        }
    }
    
    /**
     * Get recent reports
     * GET /api/reports/recent
     */
    @GET
    @Path("/recent")
    public Response getRecentReports() {
        try {
            List<RecentReportResponse> recentReports = reportService.getRecentReports();
            return Response.ok(recentReports).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                .entity(new ErrorResponse("Error fetching recent reports: " + e.getMessage()))
                .build();
        }
    }
    
    /**
     * Download report by ID
     * GET /api/reports/download/{reportId}
     * Note: Currently returns JSON data. File generation (PDF/XLSX/CSV) can be added later
     */
    @GET
    @Path("/download/{reportId}")
    public Response downloadReport(@PathParam("reportId") Long reportId) {
        try {
            // For now, reports are generated on-demand and not stored
            // This endpoint can be enhanced to:
            // 1. Store generated reports in database/file system
            // 2. Generate actual PDF/XLSX/CSV files
            // 3. Return file download
            
            return Response.status(Response.Status.NOT_IMPLEMENTED)
                .entity(new ErrorResponse("Report download not yet implemented. Reports are generated on-demand."))
                .build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                .entity(new ErrorResponse("Error downloading report: " + e.getMessage()))
                .build();
        }
    }
    
    // Error response class
    private static class ErrorResponse {
        private String message;
        
        public ErrorResponse(String message) {
            this.message = message;
        }
        
        public String getMessage() {
            return message;
        }
        
        public void setMessage(String message) {
            this.message = message;
        }
    }
}
