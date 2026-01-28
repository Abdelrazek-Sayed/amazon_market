import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/api_service.dart';
import '../models/product.dart';
import '../models/category.dart';
import '../widgets/product_card.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  late Future<Map<String, dynamic>> _homeData;

  @override
  void initState() {
    super.initState();
    _homeData = Provider.of<ApiService>(context, listen: false).getHomeData();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('متجري', style: TextStyle(fontWeight: FontWeight.bold)),
        centerTitle: true,
        backgroundColor: Colors.indigo,
        foregroundColor: Colors.white,
        actions: [
          IconButton(
            icon: const Icon(Icons.shopping_cart),
            onPressed: () => Navigator.pushNamed(context, '/cart'),
          ),
        ],
      ),
      body: FutureBuilder<Map<String, dynamic>>(
        future: _homeData,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('حدث خطأ ما: ${snapshot.error}'));
          } else if (!snapshot.hasData) {
            return const Center(child: Text('لا توجد بيانات'));
          }

          final categories = snapshot.data!['categories'] as List<Category>;
          final featuredProducts = snapshot.data!['featured_products'] as List<Product>;

          return SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Hero Section
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.symmetric(vertical: 40, horizontal: 20),
                  decoration: const BoxDecoration(
                    gradient: LinearGradient(
                      colors: [Colors.indigo, Colors.purple],
                    ),
                  ),
                  child: Column(
                    children: [
                      const Text(
                        'مرحباً بك في متجري',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 28,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 10),
                      const Text(
                        'تسوق أفضل المنتجات بأفضل الأسعار',
                        style: TextStyle(color: Colors.white70, fontSize: 16),
                      ),
                      const SizedBox(height: 20),
                      ElevatedButton(
                        onPressed: () => Navigator.pushNamed(context, '/products'),
                        style: ElevatedButton.styleFrom(
                          foregroundColor: Colors.indigo,
                          backgroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 12),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(30),
                          ),
                        ),
                        child: const Text('ابدأ التسوق الآن', style: TextStyle(fontWeight: FontWeight.bold)),
                      ),
                    ],
                  ),
                ),

                // Categories
                const Padding(
                  padding: EdgeInsets.all(16.0),
                  child: Text(
                    'تصفح حسب الفئة',
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                ),
                SizedBox(
                  height: 100,
                  child: ListView.builder(
                    scrollDirection: Axis.horizontal,
                    itemCount: categories.length,
                    itemBuilder: (context, index) {
                      final category = categories[index];
                      return Container(
                        width: 100,
                        margin: const EdgeInsets.symmetric(horizontal: 8),
                        child: Column(
                          children: [
                            CircleAvatar(
                              radius: 30,
                              backgroundColor: Colors.indigo.shade50,
                              child: const Icon(Icons.category, color: Colors.indigo),
                            ),
                            const SizedBox(height: 5),
                            Text(
                              category.name,
                              textAlign: TextAlign.center,
                              overflow: TextOverflow.ellipsis,
                              style: const TextStyle(fontSize: 12),
                            ),
                          ],
                        ),
                      );
                    },
                  ),
                ),

                // Featured Products
                const Padding(
                  padding: EdgeInsets.all(16.0),
                  child: Text(
                    'المنتجات المميزة',
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                ),
                GridView.builder(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2,
                    childAspectRatio: 0.7,
                    crossAxisSpacing: 10,
                    mainAxisSpacing: 10,
                  ),
                  itemCount: featuredProducts.length,
                  itemBuilder: (context, index) {
                    return ProductCard(product: featuredProducts[index]);
                  },
                ),
                const SizedBox(height: 20),
              ],
            ),
          );
        },
      ),
    );
  }
}
