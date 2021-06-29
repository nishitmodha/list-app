if Rails.env === 'production' 
  Rails.application.config.session_store :cookie_store, key: '_list-app', domain: 'list-app'
else
  Rails.application.config.session_store :cookie_store, key: '_list-app' 
end
