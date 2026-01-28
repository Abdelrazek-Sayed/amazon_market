class Product {
  final int id;
  final String name;
  final String? description;
  final double price;
  final String? image;
  final String? slug;
  final int quantity;
  final double? averageRating;
  final int? reviewsCount;

  Product({
    required this.id,
    required this.name,
    this.description,
    required this.price,
    this.image,
    this.slug,
    required this.quantity,
    this.averageRating,
    this.reviewsCount,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id: json['id'],
      name: json['name'],
      description: json['description'],
      price: double.parse(json['price'].toString()),
      image: json['image'],
      slug: json['slug'],
      quantity: json['quantity'] ?? 0,
      averageRating: json['average_rating'] != null 
          ? double.parse(json['average_rating'].toString()) 
          : null,
      reviewsCount: json['reviews_count'],
    );
  }
}
