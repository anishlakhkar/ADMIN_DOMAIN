package com.drugmanagement.service;

import com.drugmanagement.dto.InventoryValuationReportResponse;
import com.drugmanagement.dto.LowStockReportResponse;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.UnitValue;
import jakarta.enterprise.context.ApplicationScoped;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@ApplicationScoped
public class ReportFileGenerator {
    
    /**
     * Generate PDF file for Inventory Valuation Report
     */
    public byte[] generateInventoryValuationPDF(InventoryValuationReportResponse report) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(baos);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf);
        
        // Title
        document.add(new Paragraph(report.getReportName()).setBold().setFontSize(18));
        document.add(new Paragraph("Generated: " + report.getGeneratedDate()).setFontSize(10));
        document.add(new Paragraph("Period: " + report.getStartDate() + " to " + report.getEndDate()).setFontSize(10));
        document.add(new Paragraph(" "));
        
        // Summary
        document.add(new Paragraph("Total Valuation: $" + report.getTotalValuation()).setBold().setFontSize(14));
        document.add(new Paragraph(" "));
        
        // Warehouse Summary Table
        if (report.getWarehouseValuations() != null && !report.getWarehouseValuations().isEmpty()) {
            document.add(new Paragraph("Warehouse Summary").setBold().setFontSize(12));
            Table warehouseTable = new Table(UnitValue.createPercentArray(new float[]{2, 2, 2, 2, 2}));
            warehouseTable.addHeaderCell("Warehouse ID");
            warehouseTable.addHeaderCell("Warehouse Name");
            warehouseTable.addHeaderCell("Total Products");
            warehouseTable.addHeaderCell("Total Quantity");
            warehouseTable.addHeaderCell("Total Value");
            
            for (InventoryValuationReportResponse.WarehouseValuation wv : report.getWarehouseValuations()) {
                warehouseTable.addCell(wv.getWarehouseId());
                warehouseTable.addCell(wv.getWarehouseName());
                warehouseTable.addCell(String.valueOf(wv.getTotalProducts()));
                warehouseTable.addCell(String.valueOf(wv.getTotalQuantity()));
                warehouseTable.addCell("$" + wv.getTotalValue());
            }
            document.add(warehouseTable);
            document.add(new Paragraph(" "));
        }
        
        // Product Details Table (first 50 products)
        if (report.getProductValuations() != null && !report.getProductValuations().isEmpty()) {
            document.add(new Paragraph("Product Details (First 50)").setBold().setFontSize(12));
            Table productTable = new Table(UnitValue.createPercentArray(new float[]{2, 3, 2, 2, 2, 2, 2}));
            productTable.addHeaderCell("SKU");
            productTable.addHeaderCell("Product Name");
            productTable.addHeaderCell("Category");
            productTable.addHeaderCell("Warehouse");
            productTable.addHeaderCell("Quantity");
            productTable.addHeaderCell("Unit Price");
            productTable.addHeaderCell("Total Value");
            
            int count = 0;
            for (InventoryValuationReportResponse.ProductValuation pv : report.getProductValuations()) {
                if (count++ >= 50) break;
                productTable.addCell(pv.getSkuId());
                productTable.addCell(pv.getProductName());
                productTable.addCell(pv.getCategory());
                productTable.addCell(pv.getWarehouseId());
                productTable.addCell(String.valueOf(pv.getQuantity()));
                productTable.addCell("$" + pv.getUnitPrice());
                productTable.addCell("$" + pv.getTotalValue());
            }
            document.add(productTable);
        }
        
        document.close();
        return baos.toByteArray();
    }
    
    /**
     * Generate PDF file for Low Stock Report
     */
    public byte[] generateLowStockPDF(LowStockReportResponse report) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(baos);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf);
        
        // Title
        document.add(new Paragraph(report.getReportName()).setBold().setFontSize(18));
        document.add(new Paragraph("Generated: " + report.getGeneratedDate()).setFontSize(10));
        document.add(new Paragraph("Period: " + report.getStartDate() + " to " + report.getEndDate()).setFontSize(10));
        document.add(new Paragraph(" "));
        
        // Summary
        document.add(new Paragraph("Total Low Stock Items: " + report.getTotalLowStockItems()).setBold().setFontSize(14));
        document.add(new Paragraph(" "));
        
        // Low Stock Items Table
        if (report.getLowStockItems() != null && !report.getLowStockItems().isEmpty()) {
            Table table = new Table(UnitValue.createPercentArray(new float[]{2, 3, 2, 2, 2, 2, 2, 2, 2}));
            table.addHeaderCell("SKU");
            table.addHeaderCell("Product Name");
            table.addHeaderCell("Category");
            table.addHeaderCell("Warehouse");
            table.addHeaderCell("Current Stock");
            table.addHeaderCell("Threshold");
            table.addHeaderCell("Shortage");
            table.addHeaderCell("Days Until Out");
            table.addHeaderCell("Priority");
            
            for (LowStockReportResponse.LowStockItem item : report.getLowStockItems()) {
                table.addCell(item.getSkuId());
                table.addCell(item.getProductName());
                table.addCell(item.getCategory());
                table.addCell(item.getWarehouseId());
                table.addCell(String.valueOf(item.getCurrentStock()));
                table.addCell(String.valueOf(item.getThreshold()));
                table.addCell(String.valueOf(item.getShortage()));
                table.addCell(String.valueOf(item.getDaysUntilOut()));
                table.addCell(item.getPriority());
            }
            document.add(table);
        }
        
        document.close();
        return baos.toByteArray();
    }
    
    /**
     * Generate XLSX file for Inventory Valuation Report
     */
    public byte[] generateInventoryValuationXLSX(InventoryValuationReportResponse report) throws IOException {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Inventory Valuation");
        
        int rowNum = 0;
        Row row = sheet.createRow(rowNum++);
        row.createCell(0).setCellValue(report.getReportName());
        
        row = sheet.createRow(rowNum++);
        row.createCell(0).setCellValue("Generated: " + report.getGeneratedDate());
        
        row = sheet.createRow(rowNum++);
        row.createCell(0).setCellValue("Period: " + report.getStartDate() + " to " + report.getEndDate());
        
        rowNum++;
        row = sheet.createRow(rowNum++);
        row.createCell(0).setCellValue("Total Valuation: $" + report.getTotalValuation());
        
        rowNum++;
        // Warehouse Summary
        if (report.getWarehouseValuations() != null && !report.getWarehouseValuations().isEmpty()) {
            row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue("Warehouse Summary");
            
            Row headerRow = sheet.createRow(rowNum++);
            headerRow.createCell(0).setCellValue("Warehouse ID");
            headerRow.createCell(1).setCellValue("Warehouse Name");
            headerRow.createCell(2).setCellValue("Total Products");
            headerRow.createCell(3).setCellValue("Total Quantity");
            headerRow.createCell(4).setCellValue("Total Value");
            
            for (InventoryValuationReportResponse.WarehouseValuation wv : report.getWarehouseValuations()) {
                row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(wv.getWarehouseId());
                row.createCell(1).setCellValue(wv.getWarehouseName());
                row.createCell(2).setCellValue(wv.getTotalProducts());
                row.createCell(3).setCellValue(wv.getTotalQuantity());
                row.createCell(4).setCellValue(wv.getTotalValue().doubleValue());
            }
            rowNum++;
        }
        
        // Product Details
        if (report.getProductValuations() != null && !report.getProductValuations().isEmpty()) {
            row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue("Product Details");
            
            Row headerRow = sheet.createRow(rowNum++);
            headerRow.createCell(0).setCellValue("SKU");
            headerRow.createCell(1).setCellValue("Product Name");
            headerRow.createCell(2).setCellValue("Category");
            headerRow.createCell(3).setCellValue("Warehouse");
            headerRow.createCell(4).setCellValue("Quantity");
            headerRow.createCell(5).setCellValue("Unit Price");
            headerRow.createCell(6).setCellValue("Total Value");
            
            for (InventoryValuationReportResponse.ProductValuation pv : report.getProductValuations()) {
                row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(pv.getSkuId());
                row.createCell(1).setCellValue(pv.getProductName());
                row.createCell(2).setCellValue(pv.getCategory());
                row.createCell(3).setCellValue(pv.getWarehouseId());
                row.createCell(4).setCellValue(pv.getQuantity());
                row.createCell(5).setCellValue(pv.getUnitPrice().doubleValue());
                row.createCell(6).setCellValue(pv.getTotalValue().doubleValue());
            }
        }
        
        // Auto-size columns
        for (int i = 0; i < 7; i++) {
            sheet.autoSizeColumn(i);
        }
        
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        workbook.write(baos);
        workbook.close();
        return baos.toByteArray();
    }
    
    /**
     * Generate XLSX file for Low Stock Report
     */
    public byte[] generateLowStockXLSX(LowStockReportResponse report) throws IOException {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Low Stock Report");
        
        int rowNum = 0;
        Row row = sheet.createRow(rowNum++);
        row.createCell(0).setCellValue(report.getReportName());
        
        row = sheet.createRow(rowNum++);
        row.createCell(0).setCellValue("Generated: " + report.getGeneratedDate());
        
        row = sheet.createRow(rowNum++);
        row.createCell(0).setCellValue("Period: " + report.getStartDate() + " to " + report.getEndDate());
        
        rowNum++;
        row = sheet.createRow(rowNum++);
        row.createCell(0).setCellValue("Total Low Stock Items: " + report.getTotalLowStockItems());
        
        rowNum++;
        // Header
        Row headerRow = sheet.createRow(rowNum++);
        headerRow.createCell(0).setCellValue("SKU");
        headerRow.createCell(1).setCellValue("Product Name");
        headerRow.createCell(2).setCellValue("Category");
        headerRow.createCell(3).setCellValue("Warehouse");
        headerRow.createCell(4).setCellValue("Current Stock");
        headerRow.createCell(5).setCellValue("Threshold");
        headerRow.createCell(6).setCellValue("Shortage");
        headerRow.createCell(7).setCellValue("Days Until Out");
        headerRow.createCell(8).setCellValue("Priority");
        
        // Data rows
        if (report.getLowStockItems() != null) {
            for (LowStockReportResponse.LowStockItem item : report.getLowStockItems()) {
                row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(item.getSkuId());
                row.createCell(1).setCellValue(item.getProductName());
                row.createCell(2).setCellValue(item.getCategory());
                row.createCell(3).setCellValue(item.getWarehouseId());
                row.createCell(4).setCellValue(item.getCurrentStock());
                row.createCell(5).setCellValue(item.getThreshold());
                row.createCell(6).setCellValue(item.getShortage());
                row.createCell(7).setCellValue(item.getDaysUntilOut());
                row.createCell(8).setCellValue(item.getPriority());
            }
        }
        
        // Auto-size columns
        for (int i = 0; i < 9; i++) {
            sheet.autoSizeColumn(i);
        }
        
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        workbook.write(baos);
        workbook.close();
        return baos.toByteArray();
    }
    
    /**
     * Generate CSV file for Inventory Valuation Report
     */
    public byte[] generateInventoryValuationCSV(InventoryValuationReportResponse report) throws IOException {
        StringBuilder csv = new StringBuilder();
        
        // Header
        csv.append("Report: ").append(report.getReportName()).append("\n");
        csv.append("Generated: ").append(report.getGeneratedDate()).append("\n");
        csv.append("Period: ").append(report.getStartDate()).append(" to ").append(report.getEndDate()).append("\n");
        csv.append("Total Valuation: $").append(report.getTotalValuation()).append("\n\n");
        
        // Warehouse Summary
        csv.append("Warehouse Summary\n");
        csv.append("Warehouse ID,Warehouse Name,Total Products,Total Quantity,Total Value\n");
        if (report.getWarehouseValuations() != null) {
            for (InventoryValuationReportResponse.WarehouseValuation wv : report.getWarehouseValuations()) {
                csv.append(wv.getWarehouseId()).append(",")
                   .append(wv.getWarehouseName()).append(",")
                   .append(wv.getTotalProducts()).append(",")
                   .append(wv.getTotalQuantity()).append(",")
                   .append(wv.getTotalValue()).append("\n");
            }
        }
        csv.append("\n");
        
        // Product Details
        csv.append("Product Details\n");
        csv.append("SKU,Product Name,Category,Warehouse,Quantity,Unit Price,Total Value\n");
        if (report.getProductValuations() != null) {
            for (InventoryValuationReportResponse.ProductValuation pv : report.getProductValuations()) {
                csv.append(pv.getSkuId()).append(",")
                   .append("\"").append(pv.getProductName()).append("\"").append(",")
                   .append(pv.getCategory()).append(",")
                   .append(pv.getWarehouseId()).append(",")
                   .append(pv.getQuantity()).append(",")
                   .append(pv.getUnitPrice()).append(",")
                   .append(pv.getTotalValue()).append("\n");
            }
        }
        
        return csv.toString().getBytes("UTF-8");
    }
    
    /**
     * Generate CSV file for Low Stock Report
     */
    public byte[] generateLowStockCSV(LowStockReportResponse report) throws IOException {
        StringBuilder csv = new StringBuilder();
        
        // Header
        csv.append("Report: ").append(report.getReportName()).append("\n");
        csv.append("Generated: ").append(report.getGeneratedDate()).append("\n");
        csv.append("Period: ").append(report.getStartDate()).append(" to ").append(report.getEndDate()).append("\n");
        csv.append("Total Low Stock Items: ").append(report.getTotalLowStockItems()).append("\n\n");
        
        // Data
        csv.append("SKU,Product Name,Category,Warehouse,Current Stock,Threshold,Shortage,Days Until Out,Priority\n");
        if (report.getLowStockItems() != null) {
            for (LowStockReportResponse.LowStockItem item : report.getLowStockItems()) {
                csv.append(item.getSkuId()).append(",")
                   .append("\"").append(item.getProductName()).append("\"").append(",")
                   .append(item.getCategory()).append(",")
                   .append(item.getWarehouseId()).append(",")
                   .append(item.getCurrentStock()).append(",")
                   .append(item.getThreshold()).append(",")
                   .append(item.getShortage()).append(",")
                   .append(item.getDaysUntilOut()).append(",")
                   .append(item.getPriority()).append("\n");
            }
        }
        
        return csv.toString().getBytes("UTF-8");
    }
}
