package com.stepup.demo.services;

import com.stepup.demo.models.User;
import com.stepup.demo.models.UserProfile;
import com.stepup.demo.models.dtos.PagedResponse;
import com.stepup.demo.models.dtos.UserDTO;
import com.stepup.demo.repository.UserProfileRepository;
import com.stepup.demo.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserProfileRepository  userProfileRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public PagedResponse<User, Long> getAllUsers(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        PagedResponse<User, Long> pagedResponse = new PagedResponse<>();
        pagedResponse.setJpaRepository(userRepository);
        pagedResponse.processNextPage(pageNumber, pageSize, sortBy, sortOrder);
        return  pagedResponse;
    }

    @Override
    public User updateUser(User user, long userId) {
        User userFromDB = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));
        userFromDB.setRole(user.getRole());
        userFromDB.setEmail(user.getEmail());
        userFromDB.setPassword(user.getPassword());
        userFromDB.setUsername(user.getUsername());
        return userRepository.save(userFromDB);
    }

    @Override
    public void deleteUser(long userId) {
        userRepository.deleteById(userId);
    }

    @Override
    public PagedResponse<UserProfile, Long> getAllUserProfiles(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        PagedResponse<UserProfile, Long> pagedResponse = new PagedResponse<>();
        pagedResponse.setJpaRepository(userProfileRepository);
        pagedResponse.processNextPage(pageNumber, pageSize, sortBy, sortOrder);
        return  pagedResponse;
    }

    @Override
    public UserProfile updateProfile(UserProfile userProfile, long userId) {
        User userFromDB = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Could not find user with id:"+userId));
        UserProfile updatedProfile = userProfileRepository.findByUser(userFromDB)
                .orElseThrow(() -> new EntityNotFoundException("Could not find profile for user with id:"+userId));
        if (updatedProfile == null) {
            throw new EntityNotFoundException("Could not find userProfiel for user with id:"+userId);
        }
        updatedProfile.setFirstName(userProfile.getFirstName());
        updatedProfile.setLastName(userProfile.getLastName());
        updatedProfile.setCity(userProfile.getCity());
        updatedProfile.setUser(userProfile.getUser());
        updatedProfile.setAddress(userProfile.getAddress());
        updatedProfile.setPostalCode(userProfile.getPostalCode());
        updatedProfile.setPhoneNumber(userProfile.getPhoneNumber());
        userProfileRepository.save(updatedProfile);
        return updatedProfile;
    }

    @Override
    public void deleteProfile(long userId) {
        User userFromDB = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Could not find user with id:"+userId));
        UserProfile deletedProfile = userProfileRepository.findByUser(userFromDB)
                .orElseThrow(() -> new EntityNotFoundException("Could not find profile for user with id:"+userId));
        userProfileRepository.delete(deletedProfile);
    }

    @Override
    public UserProfile getUserProfile(long userId) {
        User userFromDB = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Could not find user with id:"+userId));
        UserProfile userProfile = userProfileRepository.findByUser(userFromDB)
                .orElseThrow(() -> new EntityNotFoundException("Could not find profile for user with id:"+userId));
        return userProfile;
    }
}
