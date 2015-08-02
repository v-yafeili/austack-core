(function () {
  'use strict';

  /**
   * Introduce the austackApp.repo.service module.
   * Register the repo resource as Repo, register the
   * service as RepoService.
   *
   * @requires {austackApp.resource}
   */
  angular
    .module('austackApp.repo.service', ['austackApp.resource'])
    .factory('Repo', Repo)
    .service('RepoService', RepoService);

  // add Repo dependencies to inject
  Repo.$inject = ['Resource', 'Config'];

  /* @ngInject */
  function Repo($resource, Config) {
    // factory members
    var apiURL = Config.API_URL + 'repos';
    // public API
    return $resource(apiURL + '/:id/:controller', {}, {
      query: {
        isArray: false
      }
    });
  }

  /* @ngInject */
  function RepoService(Repo, Config, $http, $q) {
    var apiURL = Config.API_URL + 'repos/';
    return {
      create: create,
      update: update,
      remove: remove,
      getRepoData: getRepoData
    };

    /**
     * Save a new repo
     *
     * @param  {Object}   repo - shapeData
     * @param  {Function} callback - optional
     * @return {Promise}
     */
    function create(repo, callback) {
      var cb = callback || angular.noop;

      return Repo.create(repo,
        function (repo) {
          return cb(repo);
        },
        function (err) {
          return cb(err);
        }).$promise;
    }

    function remove(repoName, uid) {
      var d = $q.defer();

      $http.delete(apiURL + repoName + '/' + uid)
        .success(function (data, status, headers, config) {
          if (data.rc == '1') {
            return d.resolve(data);
          }

          return d.reject('delete failed');
        })
        .error(function (data, status, headers, config) {
          console.log(data, repoName);
          d.reject(data);
        });

      return d.promise;
    }

    /**
     * Create a new repo
     *
     * @param  {Object}   repo - shapeData
     * @param  {Function} callback - optional
     * @return {Promise}
     */
    function update(repo, callback) {
      var cb = callback || angular.noop;

      return Repo.update(repo,
        function (repo) {
          return cb(repo);
        },
        function (err) {
          return cb(err);
        }).$promise;
    }

    function getRepoData(repoName) {
      var d = $q.defer();

      $http.get(apiURL + repoName)
        .success(function (data, status, headers, config) {
          if (data.data) {
            return d.resolve(data);
          }

          return d.reject('no data');
        })
        .error(function (data, status, headers, config) {
          console.log(data, repoName);
          d.reject(data);
        });

      return d.promise;
    }

  }
})();