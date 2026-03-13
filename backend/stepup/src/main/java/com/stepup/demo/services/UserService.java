package com.stepup.demo.services;

import com.stepup.demo.models.User;
import com.stepup.demo.models.UserProfile;
import com.stepup.demo.models.dtos.PagedResponse;

public interface UserService {
    PagedResponse<User, Long> getAllUsers(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    User updateUser(User user, long userId);

    void deleteUser(long userId);

    PagedResponse<UserProfile, Long> getAllUserProfiles(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    UserProfile updateProfile(UserProfile userProfile, long userId);

    void deleteProfile(long userId);
}
