//** Data Transfer Object (DTO) — один из шаблонов проектирования, используется
//** для передачи данных между подсистемами приложения

module.exports = function UserDto(model) {
  return {
    id: model.id,
    name: model.name,
    email: model.email,
    isActivated: model.is_activated,
    role_id: model.role_id,
    // image: model.image,
    // about: model.about,
    //phone: model.phone,
    //city_id: model.city_id,
  };
};
