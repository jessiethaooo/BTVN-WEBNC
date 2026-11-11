import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface FashionItem {
  id: string;
  style: string;
  fashion_subject: string;
  fashion_detail: string;
  image: string;
  similarity: number;
}

@Component({
  selector: 'app-search-fashion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-fashion-component.html',
  styleUrls: ['./search-fashion-component.css']
})
export class SearchFashionComponent implements OnInit {
  searchTerm: string = 'Vintage Jacket Denim';
  searchTarget: 'subject' | 'detail' | 'both' = 'both';
  selectedMetric: 'cosine' | 'jaccard' = 'cosine';
  displayLimit: number = 10;

  // Dữ liệu mẫu phong phú để test kết quả
  mockFashionList: Omit<FashionItem, 'similarity'>[] = [
    { id: 'F01', style: 'Vintage', fashion_subject: 'Vintage Denim Jacket', fashion_detail: 'Classic blue denim jacket with vintage finish buttons and fleece collar', image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=200' },
    { id: 'F02', style: 'Streetwear', fashion_subject: 'Denim Oversized Jacket', fashion_detail: 'Modern streetwear denim jacket with distressed style details', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200' },
    { id: 'F03', style: 'Retro', fashion_subject: 'Vintage Leather Coat', fashion_detail: 'Retro brown leather jacket with classic zipper and warm inner lining', image: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=200' },
    { id: 'F04', style: 'Casual', fashion_subject: 'Casual Cotton Hoodie', fashion_detail: 'Soft fleece hoodie suitable for daily casual wear in winter', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=200' },
    { id: 'F05', style: 'Minimalist', fashion_subject: 'Minimalist White T-Shirt', fashion_detail: 'Plain white premium cotton t-shirt with clean aesthetic detail', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=200' },
    { id: 'F06', style: 'Formal', fashion_subject: 'Formal Slim Suit Blazer', fashion_detail: 'Black elegant formal blazer jacket with refined button details', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200' },
    { id: 'F07', style: 'Sporty', fashion_subject: 'Sporty Windbreaker Jacket', fashion_detail: 'Lightweight waterproof windbreaker jacket for outdoor running sports', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200' },
    { id: 'F08', style: 'Boho', fashion_subject: 'Vintage Floral Summer Dress', fashion_detail: 'Bohemian floral pattern dress with lightweight cotton fabric details', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=200' }
  ];

  displayedList: FashionItem[] = [];

  ngOnInit(): void {
    this.onSearch();
  }

  onSearch(): void {
    const query = this.searchTerm.trim();

    // Tính điểm Similarity cho từng item
    const calculatedList: FashionItem[] = this.mockFashionList.map(item => {
      let targetText = '';
      if (this.searchTarget === 'subject') targetText = item.fashion_subject;
      else if (this.searchTarget === 'detail') targetText = item.fashion_detail;
      else targetText = `${item.fashion_subject} ${item.fashion_detail}`;

      const simScore = query === '' 
        ? 0 
        : (this.selectedMetric === 'cosine' 
            ? this.calculateCosine(query, targetText) 
            : this.calculateJaccard(query, targetText));

      return { ...item, similarity: simScore };
    });

    // Sắp xếp GIẢM DẦN theo Similarity
    calculatedList.sort((a, b) => b.similarity - a.similarity);

    // Cắt theo số lượng giới hạn hiển thị
    this.displayedList = calculatedList.slice(0, this.displayLimit);
  }

  // Phân lớp CSS theo đúng yêu cầu đề bài
  getScoreClass(score: number): string {
    if (score >= 0.75) {
      return 'score-high'; // [0.75 -> 1]: Nền vàng + Chữ đỏ
    } else if (score >= 0.5) {
      return 'score-medium'; // [0.5 -> 0.75): Nền hồng + Chữ xanh
    } else {
      return 'score-low'; // < 0.5: Nền đỏ + Chữ trắng
    }
  }

  // --- THUẬT TOÁN ĐỘ ĐO ---

  // Tách từ (Tokenize)
  private tokenize(text: string): string[] {
    return text.toLowerCase().replace(/[^\w\s]/gi, '').split(/\s+/).filter(w => w.length > 0);
  }

  // 1. Độ đo Jaccard Similarity: |A ∩ B| / |A ∪ B|
  private calculateJaccard(str1: string, str2: string): number {
    const tokens1 = new Set(this.tokenize(str1));
    const tokens2 = new Set(this.tokenize(str2));
    if (tokens1.size === 0 || tokens2.size === 0) return 0;

    const intersection = new Set([...tokens1].filter(x => tokens2.has(x)));
    const union = new Set([...tokens1, ...tokens2]);
    return union.size === 0 ? 0 : intersection.size / union.size;
  }

  // 2. Độ đo Cosine Similarity: (A · B) / (||A|| * ||B||)
  private calculateCosine(str1: string, str2: string): number {
    const tokens1 = this.tokenize(str1);
    const tokens2 = this.tokenize(str2);
    if (tokens1.length === 0 || tokens2.length === 0) return 0;

    const vocabulary = Array.from(new Set([...tokens1, ...tokens2]));
    const vec1 = vocabulary.map(word => tokens1.filter(w => w === word).length);
    const vec2 = vocabulary.map(word => tokens2.filter(w => w === word).length);

    let dotProduct = 0;
    let mag1 = 0;
    let mag2 = 0;

    for (let i = 0; i < vocabulary.length; i++) {
      dotProduct += vec1[i] * vec2[i];
      mag1 += vec1[i] * vec1[i];
      mag2 += vec2[i] * vec2[i];
    }

    const magnitude = Math.sqrt(mag1) * Math.sqrt(mag2);
    return magnitude === 0 ? 0 : dotProduct / magnitude;
  }
}