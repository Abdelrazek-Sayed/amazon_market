import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/product.dart';
import '../models/category.dart';

class ApiService {
  // Use 10.0.2.2 for Android Emulator, local IP for physical devices
  // For web running in Docker, we'll use the server's public/local address
  static const String baseUrl = 'http://localhost:8000/api'; 

  Future<Map<String, dynamic>> getHomeData() async {
    final response = await http.get(Uri.parse('$baseUrl/home'));
    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      return {
        'categories': (data['categories'] as List)
            .map((i) => Category.fromJson(i))
            .toList(),
        'featured_products': (data['featured_products'] as List)
            .map((i) => Product.fromJson(i))
            .toList(),
        'new_products': (data['new_products'] as List)
            .map((i) => Product.fromJson(i))
            .toList(),
      };
    } else {
      throw Exception('Failed to load home data');
    }
  }

  Future<List<Product>> getProducts({int? categoryId, String? search}) async {
    String url = '$baseUrl/products';
    Map<String, String> queryParams = {};
    if (categoryId != null) queryParams['category'] = categoryId.toString();
    if (search != null) queryParams['search'] = search;
    
    if (queryParams.isNotEmpty) {
      url += '?' + Uri(queryParameters: queryParams).query;
    }

    final response = await http.get(Uri.parse(url));
    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      return (data['data'] as List)
          .map((i) => Product.fromJson(i))
          .toList();
    } else {
      throw Exception('Failed to load products');
    }
  }

  Future<Product> getProductDetail(int id) async {
    final response = await http.get(Uri.parse('$baseUrl/products/$id'));
    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      return Product.fromJson(data['product']);
    } else {
      throw Exception('Failed to load product detail');
    }
  }
}
