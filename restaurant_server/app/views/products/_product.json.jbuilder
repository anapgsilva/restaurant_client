json.extract! product, :id, :name, :category, :price, :image, :created_at, :updated_at
json.url product_url(product, format: :json)
