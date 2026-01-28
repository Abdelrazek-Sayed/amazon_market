class Category {
  final int id;
  final String name;
  final String? image;
  final List<Category>? children;

  Category({
    required this.id,
    required this.name,
    this.image,
    this.children,
  });

  factory Category.fromJson(Map<String, dynamic> json) {
    return Category(
      id: json['id'],
      name: json['name'],
      image: json['image'],
      children: json['children'] != null
          ? (json['children'] as List)
              .map((i) => Category.fromJson(i))
              .toList()
          : null,
    );
  }
}
